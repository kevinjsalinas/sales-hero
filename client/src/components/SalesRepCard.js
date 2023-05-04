import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import SalesRepLead from './SalesRepLead';

function SalesRepCard ( { id, name, close_rate, leads, setData, list }) {
    const [showEdit, setShowEdit] = useState(true);

    // console.log(salesrep.leads[0].email, "test")
    console.log(leads, "sales rep card")

    let intlocation = parseInt(id)

    let handleSubmit = (e) => {
        e.preventDefault();
        //check what was actually changed and if no change set to existing value
        if (e.target.name.value !== '') {
            name = e.target.name.value;
        }
        
        if (e.target.close_rate.value !== '') {
            close_rate = e.target.close_rate.value;
        }
    
        fetch(`/salesreps/${intlocation}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'name': name,
                'close_rate': close_rate 
            })
        })
        .then(r => {
            console.log(r.status)
            return r.json();
        })
        .then (r => {

            let copy = [...list]
            let salesrepID = r.id-1;
            copy[salesrepID].name = name
            copy[salesrepID].close_rate = close_rate
            setData(copy)
            setShowEdit(!showEdit)
        })
    }

    let switchDisplay = () => {
        setShowEdit(!showEdit)
    }

    let salesrepLeadList = leads?.map((lead) => {
        return < SalesRepLead {...lead} />
    }) 

    let mainDisplay = () => {

        return (
            <div className="card-body">
                <h1 class='card-title'>{name}</h1>
                <h4>ID #: {id}</h4>
                <h4>Close Rate: {close_rate}%</h4>
                <h2 class='card-title'>Leads Assigned</h2>
                {salesrepLeadList}
            </div>
        )
    }

    let modDisp = () => {

        return (
            <div class='form-group mb-2'>
                <form onSubmit={handleSubmit} style={{ width: '87%', margin:'auto'}}>
                    <label>Name:</label>
                    <input class="form-control" name='name' id="salesrep-name" placeholder="James Lopez" />
                    <label>Close Rate %:</label>
                    <input class="form-control mb-3" name= 'close_rate' id="salesrep-percent" placeholder="50.0" />
                    <div class="ms-2 text-center">
                        <Button type="submit mt-1" variant="primary" class="mb-2 btn btn-primary">Submit</Button>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <div class="mt-4">
            <div class="card text-center bg-light">
                {
                    showEdit? mainDisplay() : modDisp()
                }
                <div class="ms-2 mb-4 text-center">
                    <Button variant="primary" onClick={switchDisplay}>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}   


export default SalesRepCard;