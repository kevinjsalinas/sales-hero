import React from "react"



function LeadCard ({lead}) {

    const { name, email, phone } = lead






    return (
        <tr>
        <td>{name}</td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <button >delete</button>
        </td>
      </tr>
    )
}

export default LeadCard;