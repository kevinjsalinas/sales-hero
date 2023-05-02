import React, { useEffect, useState } from "react";

import LeadCard from "../components/LeadCard";

function Leads() {

    const [data, setData] = useState([])

    useEffect(()=>{

        fetch('/leads')
            .then(res => res.json())
            .then(data=> {
                setData(data)
            })
    }, [])


    const leadsList = data?.map((lead) => {
        return ( <LeadCard lead={lead} /> )
    })


    return (
        <>  
            <div className="ui segment">
                <form  className="ui form">
                    <div className="inline fields">
                        <input  type="name" name="name" />
                        <input  type="phone" name="phone" placeholder="831-231-2123" />
                        <input  type="email" name="email" placeholder="username@email.com" />
                    </div>
                    <button className="ui button" type="submit">
                        Add Lead
                    </button>
                </form>
            </div>
            <table className="ui celled striped padded table">
                <tbody>
                    <tr>
                        <th>
                            <h3 className="ui center aligned header">Date</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">Description</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">Category</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">Amount</h3>
                        </th>
                    </tr>
                    {leadsList}
                 </tbody>
            </table>
        </>
    )
}


export default Leads;