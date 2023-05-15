import React from "react";
import {
    MDBFooter
  } from 'mdb-react-ui-kit';


function Footer () {



    return (
        <> 
         <MDBFooter className='text-center' color='white' bgColor='dark'>
            <div className='text-center p-3' 
                style={{ backgroundColor: "black" }}>
                    © 2023 SALESHERO
                <div className='text-white b-3 pt-3'>
                    - KS
                </div>
            </div>
        </MDBFooter>


        </>
    )
}

export default Footer;