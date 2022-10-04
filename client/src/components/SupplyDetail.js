import axios from "axios"
import { React, useEffect, useState } from "react"
import { useParams, useNavigate, Navigate} from "react-router-dom"


function SupplyDetail(props) {


    const navigate = useNavigate()

    const [detailedSupply, setDetailedSupply ] = useState({
      item: "",
      locationName: "",
      price: "",
      quanity: "",
      imgUrl: "",
      urgent: "",
      dateOfPurchase: []

    })

    const [ editInputs, setEditInputs] = useState({
      item: detailedSupply.item,
      locationName: "",
      price: "",
      quanity: "",
      imgUrl: "",
      urgent: "",
      dateOfPurchase: ""
    })

 
    const [urgent, setUrgent] = useState(false)

    const [isEditing, setIsEditing] = useState(false)



    const [purchaseDates, setPurchaseDates] = useState([])

    // const purchaseDates = detailedSupply.dateOfPurchase

    const { supplyId } = useParams()

    useEffect(()=> {
      axios.get(`/api/supplies/${supplyId}`)
          .then( res => {
            setDetailedSupply(res.data)
              if (res.data.urgent === true) {
                  setUrgent(true)
  } 
            setPurchaseDates(res.data.dateOfPurchase)  
            setEditInputs(res.data)
          }           
          )
          .catch(err => console.log(err))
  }, [supplyId])





    console.log(detailedSupply.item)
    console.log(editInputs)
    
    

    const dates = purchaseDates.map(date => {

        const newDate = new Date(date).getUTCDate()
        let month = new Date(date).getUTCMonth()
        month = month + 1
        const year = new Date(date).getUTCFullYear()


             return <li className = "purchase-dates">{month} - {newDate} - {year}</li>
    })

    
    function urgentToggleTrue() {
      axios.put(`/supplies/${detailedSupply._id}`, {urgent: true})
        .then(res => setUrgent(true) )
        .catch(err => console.log(err))
    }

    function urgentToggleFalse() {
      axios.put(`/supplies/${detailedSupply._id}`, {urgent: false})
        .then(res => setUrgent(false) )
        .catch(err => console.log(err))
    }

    function handleEditChange(e) {
      const {name, value} = e.target
      setEditInputs(prevEditInputs => {
        return {
          ...prevEditInputs,
          [name]: value
        }
      })
    }

    function handleEditSave(e){
      e.preventDefault()
      console.log(editInputs)
      setIsEditing(false)
      axios.put(`/supplies/${detailedSupply._id}`, editInputs)
        .then(res => setDetailedSupply(res.data))
        .catch(err => console.log(err))
    }

    function addDateOfPurchase(e) {
      setEditInputs(prevEditInputs => {
        return {
          ...prevEditInputs,
          dateOfPurchase: e.target.value
        }
      })

      

      console.log(editInputs.dateOfPurchase)
      axios.put(`/supplies/dateOfPurchase/${detailedSupply._id}`, {dateOfPurchase: editInputs.dateOfPurchase})
        .then(res => setDetailedSupply(res.data))
        .catch(err => console.log(err))

      setIsEditing(false)

    }




    return (
        <>
          <div className = "detail-page">
            <button className = "back-btn" onClick = {()=> navigate(-1)}>Back</button>
            <img src = {detailedSupply.imgUrl} alt = "supply-img" className = "supply-detail-img"/>
           {!isEditing ?  
            <ul className = "details-list">
              <li><strong>Supply Item:</strong> {detailedSupply.item}</li>
              <li><strong>Purchase Location:</strong> {detailedSupply.locationName}</li>
              <li><strong>Price /ea:</strong> {detailedSupply.price}</li>
              <li><strong>Ranch Qty:</strong> {detailedSupply.quanity}</li>
              <strong>Purchase Dates:</strong>{dates}
              {urgent ? <li className = "urgent-alert"><strong>URGENT PURCHASE REQURIED!</strong></li> : <></>}
              <button onClick = {() => setIsEditing(true)}>EDIT</button>
            </ul>

            :
            <>
              <h2>EDIT Supply</h2>
              <form className = "detail-edit-form">
                <input onChange = {handleEditChange} type = "text" name = "item" value = {editInputs.item} />
                <input onChange = {handleEditChange} type = "text" name = "locationName" value = {editInputs.locationName}/>
                <input onChange = {handleEditChange} type = "text" name = "price" value = {editInputs.price}/>
                <input onChange = {handleEditChange} type = "number" name = "quanity" value = {editInputs.quanity}/>
                <span>Add Date of Purchase</span><input onChange = {handleEditChange} type = "date" name = "dateOfPurchase" value = {editInputs.dateOfPurchase} /><span><button onClick = {addDateOfPurchase}>Add Date</button></span>
              <button type = "submit" onClick = {handleEditSave}>SAVE</button>
            </form>
            </>
            
}


            {urgent ? <button className = "urgent-btn" onClick = {urgentToggleFalse}>Remove URGENT</button> : <button className = "urgent-btn"  onClick = {urgentToggleTrue}>Mark as URGENT</button> }



          </div>
        </>
    )
}

export default SupplyDetail