import React from "react"


function CallCard({id, salesrep, lead, removeCall}) {


    console.log(id, "test in callcard")

    let intlocation = parseInt(id)

    let dropCall = () => {

        fetch(`/calls/${intlocation}`, { method: 'DELETE'})

        removeCall(id)

    }

    return (
        <tr>
        <td>{id}</td>
        <td>{salesrep.name}</td>
        <td>{lead.name}</td>
        <td>
          <button onClick={dropCall}>delete</button>
        </td>
      </tr>
    )
}

export default CallCard;