import React, {useEffect, useState} from "react";
import SalesRepCard from "../components/SalesRepCard";

function SalesReps() {

    const [data, setData] = useState([])

    useEffect(() => { 
        fetch("/salesreps")
            .then(res=> res.json())
            .then(data => {
             setData(data)
            })
    }, [])

    let salesrepList = data.map((salesrep) => {
        return < SalesRepCard key={salesrep.id} {...salesrep} setData={setData} list={data}/>
    }) 

    return (
        <>
            <h1>SalesReps Page</h1>
            <div className='row row-cols-3 px-3 pe-2 ps-3'>
                {salesrepList}
            </div>
        </>
    )
}


export default SalesReps;