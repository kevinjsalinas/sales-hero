import React from "react"
import LeadSalesRep from "./LeadSalesRep"

function LeadCard ({id, name, email, phone, salesreps, removeLead}) {

    let intlocation = parseInt(id)

    let dropLead = () => {

        fetch(`/leads/${intlocation}`, { method: 'DELETE'})

        removeLead(id)

    }


    let leadSalesrepList = salesreps?.map((salesrep) => {
        return < LeadSalesRep key={salesrep.id} {...salesrep} />
    }) 

    return (
        <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>{leadSalesrepList}</td>
        <td>
          <button onClick={dropLead} >delete</button>
        </td>
      </tr>
    )
}

export default LeadCard;