import React, { useEffect, useState} from "react";
import CallCard from "../components/CallCard";
import Button from 'react-bootstrap/Button';

function Calls() {

    const [data, setData] = useState([])
    const [visible, setVisible] = useState(true)
    const [formData, setFormData] = useState({
        date: "",
        time: "",
        salesrep_id: "",
        lead_id: ""
    })

    const [salesrepdata, setSalesrepData] = useState([])
    const [leaddata, setLeadData] = useState([])

    let handleSubmit = (e) => {

        e.preventDefault()

        fetch('/calls', {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'date': formData['date'],
                'time': formData['time'],
                'salesrep_id': formData['salesrep_id'],
                'lead_id': formData['lead_id']
            })
        })
        .then(r=>r.json())
        .then(r=> {
            setData([...data, r])
        })
        setVisible(!visible)
        e.target.reset()

    }

    let removeCall = (drop) => {
        setData(data.filter((call) => call.id !== drop))
    }

    // const handleVisible = () => {
    //     setVisible(!visible)
    // }

    let handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    useEffect(()=>{
        fetch('/calls')
            .then(r => r.json())
            .then(data => {
                setData(data)
            })
    }, [])


    // salesrep data 
    useEffect(()=>{
        fetch('/salesreps')
            .then(r => r.json())
            .then(salesrepdata => {
                setSalesrepData(salesrepdata)
            })
    }, [])

    //lead data 
    useEffect(()=>{
        fetch('/leads')
            .then(r => r.json())
            .then(leaddata => {
                setLeadData(leaddata)
            })
    }, [])


    let callList = data?.map((call) => {
        return <CallCard removeCall={removeCall} {...call}  />
    })

    return (
        <>
            <h1 className="textcenter">Calls</h1>
            <div class="text-center mt-3">
            {/* <Button variant = "primary" class="mt-1" onClick={handleVisible}>Book a new call</Button> */}
            <div class="p-4">
                <form  onSubmit={handleSubmit} className="ui form ui segment">
                <div class="four fields">
                    <div class="field">
                        <label>Sales Rep Name</label>
                        <select defaultValue = "default" onChange={handleChange} name='salesrep_id'>
                            <option value="Default">Choose an option</option>
                            {salesrepdata?.map((salesr) => {
                                return <option value={salesr.id} >{salesr.name}</option>
                                })
                            }
                        </select>
                        <div data-lastpass-icon-root="true" 
                            style={{position: "relative !important", 
                                height: "0px !important", 
                                width: "0px !important", 
                                float: "left !important"}}>
                        </div>
                    </div>
                    <div class="field">
                        <label>Lead Name</label>
                        <select defaultValue = "default" onChange={handleChange} name='lead_id'>
                            <option value="Default">Choose an option</option>
                            {leaddata?.map((lead) => {
                                return <option value={lead.id}>{lead.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div class="field">
                        <label>Date</label>
                        <input 
                            onChange={handleChange} 
                            type="date" 
                            name="date" 
                        />
                    </div>
                    <div class="field">
                        <label>Time</label>
                        <input 
                            onChange={handleChange} 
                            type="time" 
                            name="time" 
                        />
                    </div>
                </div>
                    <div className="text-center">
                        <Button 
                            type="submit" 
                            variant="dark" 
                            className="mb-3 mt-3 px-4 py-2 btn btn-primary">
                                Book Call
                        </Button>
                    </div>
                </form>

                <table className="ui celled striped padded table">
                    <tbody>
                        <tr>
                            <th>
                                <h3 className="ui center aligned header">Call #</h3>
                            </th>
                            <th>
                                <h3 className="ui center aligned header">Sales Rep</h3>
                            </th>
                            <th>
                                <h3 className="ui center aligned header">Lead</h3>
                            </th>
                            <th>
                                <h3 className="ui center aligned header">Date</h3>
                            </th>
                            <th>
                                <h3 className="ui center aligned header">Time</h3>
                            </th>
                        </tr>
                        {callList}
                    </tbody>
                </table>
            </div>
        </div>
            
        </>
    )
}


export default Calls;