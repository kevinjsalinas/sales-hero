import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';

function SalesRepCard ( { salesrep, setData, list }) {
    const [showEdit, setShowEdit] = useState(true);

    let { id, name, close_rate } = salesrep

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

    let mainDisplay = () => {

        return (
            <div className="card-body">
                <h1 class='card-title'>{name}</h1>
                <h4>Close Rate: {close_rate}%</h4>
            </div>
        )
    }

    let modDisp = () => {

        return (
            <div class='form-group mb-2'>
                <form onSubmit={handleSubmit}>
                    <label>Name:</label>
                    <input class="form-control" name='name' id="salesrep-name" placeholder="ex. James Lopez" />
                    <label>Close Rate %:</label>
                    <input class="form-control mb-3" name= 'close_rate' id="salesrep-percent" placeholder="ex. 50.0" />
                    <div class="ms-2 text-center">
                        <Button type="submit mt-1" variant="dark" class="btn btn-primary">Submit</Button>
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
                <div class="ms-2 mb-2 text-center">
                    <Button variant="primary" onClick={switchDisplay}>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}   


export default SalesRepCard;