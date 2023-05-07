import React from "react"


function CallCard({id, date, time, salesrep, lead, removeCall}) {

	//handle 24h conversion to 12h

	const timeHour = time
	const firstTwoChar = timeHour.slice(0,2)
	const lastTwoChar = timeHour.slice(-2)

	const amOrPm = firstTwoChar >= 12 ? "PM" : 'AM'

	const intConvert = parseInt(firstTwoChar)

	const convertTime = ((intConvert + 11) % 12 + 1 )





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
        <td>{date}</td>
        <td>{convertTime}:{lastTwoChar} {amOrPm}</td>
        <td>
          <button onClick={dropCall}>Delete</button>
        </td>
      </tr>
    )
}

export default CallCard;