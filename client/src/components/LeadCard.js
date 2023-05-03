import React from "react"

function LeadCard ({lead, removeLead}) {

    const { id, name, email, phone } = lead

    let intlocation = parseInt(id)

    let dropLead = () => {

        fetch(`/leads/${intlocation}`, { method: 'DELETE'})

        removeLead(id)

    }

    return (
        <tr>
        <td>{name}</td>
        <td>{phone}</td>
        <td>{email}</td>
        <td>
          <button onClick={dropLead} >delete</button>
        </td>
      </tr>
    )
}

export default LeadCard;