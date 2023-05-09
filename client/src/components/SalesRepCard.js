import { React, useState } from 'react';
import Button from 'react-bootstrap/Button';
import SalesRepLead from './SalesRepLead';



function SalesRepCard ( { id, name, image, close_rate, leads, setData, list }) {
    const [showEdit, setShowEdit] = useState(true);

    //default state for patch placeholder 
    const [ sRNameDefault, setsRNameDefault] = useState(name)
    const [ sRImageDefault, setsRImageDefault] = useState(image)
    const [ sRCloseRateDefault, setsRCloseRateDefault] = useState(close_rate)

    //showFrontCard useState needed 
    const [ showFront, setShowFront ] = useState(true)

    //front card component 
    const Front = () => {

        return ( 
            <>
                <img className="pt-3" src={image} alt={name} style={{ width: '92%', height: '50%' }}/>
                <h3>Calls Booked: {salesrepLeadList.length}</h3>
                <h3 className='pb-3'>Close Rate: {close_rate}%</h3>
            </>               
        )    
    }

    //back card component 
    const Back = () => {

        return (
            <>
                <h2 className='card-title click-me'>Leads Assigned</h2>
                <div className='pb-5 pt-3'>
                    {salesrepLeadList}
                </div>
            </>
        )
    }

    //toggle action for the card front/back to work 
    const toggleCard = () => {

        setShowFront(showFront => !showFront)

    }

    let intlocation = parseInt(id)

    let handleSubmit = (e) => {
        e.preventDefault();
        //check what was actually changed and if no change set to existing value
        if (e.target.name.value !== '') {
            name = e.target.name.value;
        }

        if (e.target.image.value !== '') {
            image = e.target.image.value;
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
                'image': image,
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
            copy[salesrepID].image = image
            copy[salesrepID].close_rate = close_rate
            setData(copy)
            setShowEdit(!showEdit)
            setsRNameDefault(name)
            setsRImageDefault(image)
            setsRCloseRateDefault(close_rate)
        })
    }

    let switchDisplay = () => {
        setShowEdit(!showEdit)
    }

    let salesrepLeadList = leads?.map((lead) => {
        return < SalesRepLead key={lead.id} {...lead} />
    }) 

    let mainDisplay = () => {

        return (
            <div onClick={toggleCard} className="card-body p-3 bg-light ">
                <h1 className='card-title'>{name}</h1>
                { showFront ? <Front/> : <Back/> }
            </div>
        )
    }

    let modDisp = () => {

        return (
            <div className='card-body p-3 bg-light '>
                <form onSubmit={handleSubmit} style={{ width: '87%', margin:'auto'}} >
                    <label className='pb-2 pt-3 bolded'>Name:</label>
                    <input className="form-control" name='name' id="salesrep-name" placeholder={sRNameDefault} />
                    <label className='pt-4 pb-2 bolded'>Image:</label>
                    <input className="form-control" name='image' id="salesrep-image" placeholder={sRImageDefault} />
                    <label className='pt-4 pb-2 bolded'>Close Rate %:</label>
                    <input className="form-control mb-3" name= 'close_rate' id="salesrep-percent" placeholder={sRCloseRateDefault} />
                    <div className="pt-4 pb-1 text-center">
                        <Button 
                            type="submit mt-1" 
                            variant="dark" 
                            className="mb-2 btn btn-primary">
                                Submit
                        </Button>
                    </div>
                </form>
            </div>
        )
    }

    return(
        <div className="mt-4">
            <div className="card text-center bg-light ">
                {
                    showEdit? mainDisplay() : modDisp()
                }
                <div className="mb-4 text-center">
                    <Button className="px-4" variant="outline-dark" onClick={switchDisplay}>
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    )
}   


export default SalesRepCard;