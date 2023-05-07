import React, { useEffect, useState } from "react";

import LeadCard from "../components/LeadCard";

function Leads() {

    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: ""
    })

    const handleSubmit = (e) => {

        e.preventDefault()

        fetch('/leads', {
            method: 'POST',
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify( {
                'name': formData.name,
                'phone': formData.phone,
                'email': formData.email
            })
        })
        .then(r => r.json())
        .then(r => {
            setData([...data, r])
        })

        e.target.reset()
    }

    let removeLead = (drop) => {
        setData(data.filter((lead) => lead.id !== drop))
    }


    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]:value})
    }

    useEffect(()=>{

        fetch('/leads')
            .then(res => res.json())
            .then(data=> {
                setData(data)
            })
    }, [])


    const leadList = data.map((lead) => {
        return ( <LeadCard key={lead.id} {...lead} removeLead={removeLead} /> )
    })


    return (
        <>  
            <h1>Leads Page</h1>
            <div className="ui segment">
                <form onSubmit={handleSubmit} className="ui form">
                    <div className="inline fields">
                        <input onChange={handleChange} type="name" name="name" placeholder="FirstName LastName" />
                        <input onChange={handleChange} type="phone" name="phone" placeholder="831-231-2123" />
                        <input onChange={handleChange} type="email" name="email" placeholder="username@email.com" />
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
                            <h3 className="ui center aligned header">Name</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">Phone</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">Email</h3>
                        </th>
                        <th>
                            <h3 className="ui center aligned header">SalesRep</h3>
                        </th>
                    </tr>
                    {leadList}
                 </tbody>
            </table>
        </>
    )
}


export default Leads;