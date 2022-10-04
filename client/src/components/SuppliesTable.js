import React, {useState} from "react"
import {Link} from "react-router-dom"
import SuppliesTableRow from "./SuppliesTableRow"

function SuppliesTable({data}) {

    console.log(data)

    const [supplyTotalPrices, setSupplyTotalPrices] = useState([])
    

   
    const initialToal = 0
    const totalNumber = supplyTotalPrices.reduce((prevValue, currValue) => prevValue + currValue, initialToal)
    
    function addTotalPrice(itemTotal){
        setSupplyTotalPrices(prevSupplyTotalPrices => {
            return [
                ...prevSupplyTotalPrices,
                itemTotal
            ]
        })
    }

    const itemName = data.map(item => {


        return ( 
            
                <SuppliesTableRow item = {item} addTotalPrice = {addTotalPrice}/>
              
        )
    } )

//     <Link to = {`/supplies/${supply._id}`} className = "supply-card-link" supply ={supply}>
//     <div className = "supply-card">
//         <img src = {supply.imgUrl} className = "supply-img" alt = "barn"/>
//         <p className= "supply-item">{supply.item.toUpperCase()}</p>
//         {supply.urgent ? <h3 className = "supply-card-urgent-tag">URGENT</h3> : <></> }
//     </div>
// </Link>
    console.log(supplyTotalPrices)

    console.log(totalNumber)

    return (
        <>
            <div>
                <p>Current Total: {totalNumber} </p>
            </div>
            <form>
                <table className = "supplies-table">
                    <thead>
                        <tr>
                            <th>item name</th>
                            <th>qty on site</th>
                            <th>est. price /per</th>
                            <th>calculate</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                            {itemName}
                        
                    </tbody>
                </table>
            </form>
        </>
    )
}

export default SuppliesTable