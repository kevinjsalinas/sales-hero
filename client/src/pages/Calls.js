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
    }

    let removeCall = (drop) => {
        setData(data.filter((call) => call.id !== drop))
    }

    const handleVisible = () => {
        setVisible(!visible)
    }

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
            <h1>Calls Page</h1>
            <div class="text-center mt-3">
            <Button variant = "primary" class="mt-1" onClick={handleVisible}>Book a new call</Button>
            <div class="p-4">
                <form hidden={visible} onSubmit={handleSubmit} style={{ width: '20%', margin:'auto'}}>
                    <label> Sales Rep</label>
                    <div class='pb-2 form-group'>
                        {/* <input onChange={handleChange} class= 'form-control' name='salesrep_id' placeholder="1"/>  */}
                        <select defaultValue = "default" onChange={handleChange} name='salesrep_id'>
                            <option value="Default">Choose an option</option>
                            {salesrepdata?.map((salesr) => {
                                return <option value={salesr.id} >{salesr.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <label >Lead</label>
                    <div class="pb-2 form-group">
                        {/* <input onChange={handleChange} name='lead_id' class="form-control" placeholder="1" /> */}
                        <select defaultValue = "default" onChange={handleChange} name='lead_id'>
                            <option value="Default">Choose an option</option>
                            {leaddata?.map((lead) => {
                                return <option value={lead.id}>{lead.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <label >Date</label>
                    <div class="pb-2 form-group">
                        <input onChange={handleChange} type="date" name="date" />
                    </div>
                    <label >Time</label>
                    <div class="pb-4 form-group">
                        <input onChange={handleChange} type="time" name="time" />
                    </div>
                    <Button variant="primary" type="submit" class="btn btn-primary">Submit</Button>
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