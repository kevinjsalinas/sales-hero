import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';


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
            <h1 className="textcenter">Leads</h1>
            {/* <div className="ui segment">
                <form onSubmit={handleSubmit} className="ui form">
                    <div className="input-group">
                        <div className="field pt-3 p-2">
                            <input 
                                onChange={handleChange}
                                className="form-control input-sm" 
                                type="name" 
                                name="name" 
                                placeholder="FirstName LastName" 
                            /> 
                        </div>
                        <div className="field pt-3 p-2">
                            <input 
                                onChange={handleChange}
                                className="pb-2 form-control" 
                                type="phone" 
                                name="phone" 
                                placeholder="831-231-2123" 
                            />
                        </div>
                        <div className="field pt-3">
                            <input 
                                onChange={handleChange}
                                className="form-control" 
                                type="email" 
                                name="email" 
                                placeholder="username@email.com" 
                            />
                        </div> 
                        
    
                    </div>
                    <button className="ui button" type="submit">
                        Add Lead
                    </button>
                </form>
            </div> */}

            <form onSubmit={handleSubmit} class="ui form ui segment">
                <div class="three fields">
                    <div class="field">
                        <label>First Name Last Name</label>
                        <input 
                            onChange={handleChange}
                            type="text" 
                            name="name" 
                            placeholder="First Name Last Name"
                        />
                        <div data-lastpass-icon-root="true" 
                            style={{position: "relative !important", 
                                height: "0px !important", 
                                width: "0px !important", 
                                float: "left !important"}}>
                        </div>
                    </div>
                    <div class="field">
                        <label>Phone #</label>
                        <input 
                            onChange={handleChange} 
                            type="text" 
                            name="phone" 
                            placeholder="839-323-4312"
                        />
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input 
                            onChange={handleChange} 
                            type="email" 
                            name="email" 
                            placeholder="username@gmail.com"
                        />
                    </div>
                </div>
                    <div className="text-center">
                        <Button 
                            type="submit" 
                            variant="dark" 
                            className="mb-3 mt-3 px-4 py-2 btn btn-primary">
                                Create
                        </Button>
                    </div>
                </form>
            
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