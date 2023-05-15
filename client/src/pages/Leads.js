import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { MDBCol } from "mdbreact";



import LeadCard from "../components/LeadCard";

function Leads() {

    //added search feature
    const [searchLead, setSearchLead] = useState([])
    const [error, setError] = useState(null)

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
        .then((r) => {
            if (r.ok) {
                setError(null)
                r.json().then(r=> {setData([...data, r])})
                setFormData({name: "", phone: "", email: ""})
            } else {
                // setError("must enter valid data")
                // console.error(r.status)
                throw Error('input required')
                // alert("Must enter valid data")
                // e.target.reset()

            }
        })
        .catch( err => {
            setError(err.message)
        })
        // .then(r => r.json())
        // .then(r => {
        //     setData([...data, r])
        // })

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

    //search function

    const filterLead = data.filter(leadObj => {
        return leadObj.name.includes(searchLead)
    })


    const leadList = filterLead.map((lead) => {
        return ( <LeadCard key={lead.id} {...lead} removeLead={removeLead} /> )
    })

    const handleSearch = e => {
        setSearchLead(e.target.value)
      }


    return (
        <>  
            <h1 className="textcenter">Leads</h1>
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
                        {error && <div style={{color:"red"}}> {error}*</div>}
                    </div>
                    <div class="field">
                        <label>Phone #</label>
                        <input 
                            onChange={handleChange} 
                            type="text" 
                            name="phone" 
                            placeholder="839-323-4312"
                        />
                        {error && <div style={{color:"red"}}> {error}*</div>}
                    </div>
                    <div class="field">
                        <label>Email</label>
                        <input 
                            onChange={handleChange} 
                            type="email" 
                            name="email" 
                            placeholder="username@gmail.com"
                        />
                        {error && <div style={{color:"red"}}> {error}*</div>}
                    </div>
                </div>
                    <div className="text-center">
                        <Button 
                            type="submit" 
                            variant="dark" 
                            className="mb-3 mt-3 px-4 py-2 btn btn-primary">
                                Create Lead
                        </Button>
                    </div>
            </form>

            {/* <div class="ui fluid category search">
            <div class="ui icon input">
                <input class="prompt" type="text" placeholder="Search animals..."/>
                <i class="search icon"></i>
            </div>
            <div class="results"></div>
            </div> */}

            <MDBCol md="12" className="">
                <div className="active-pink-3 active-pink-4 mb-4">
                    <input 
                        onChange={handleSearch} 
                        className="form-control" 
                        type="text" 
                        placeholder="Search Lead By Name" 
                        aria-label="Search" />
                </div>
            </MDBCol>

            
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