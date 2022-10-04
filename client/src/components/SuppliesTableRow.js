import React, {useState} from "react"
import {Link} from "react-router-dom"


function SuppliesTableRow({item, addTotalPrice}) {

    
    const [tempQty, setTempQty] = useState(1)
    const [tempTotal, setTempTotal] = useState(null)
    

    

    function addTotal(e) {
        e.preventDefault()
        const total = item.price * tempQty
        setTempTotal(total)
        addTotalPrice(total)
        
        
    }

    



    return (
        <tr>
                   <td><Link to = {`/supplies/${item._id}`}  id="supply-item-data" supply ={item}>{item.item}</Link></td>
                    <td>{item.quanity}</td>
                    <td>{item.price}</td>
                    <td>{`${item.price} X`}<input type = "number" className = "qty-input" value = {tempQty} onChange = {(e)=>setTempQty(e.target.value)} /><button className = "qty-btn" onClick = {addTotal}>=</button>{tempTotal === null ? <></> : <p>{`$${tempTotal}`}</p>}</td>
        </tr>
              
    )
}

export default SuppliesTableRow