import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
// import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom";

import { UserContext } from '../context/user';

function NavBar() {

    const { setUser } = useContext(UserContext);

    const handleLogout = () => {

        fetch("/logout", {method: "DELETE"})
        .then((r)=> {
            if (r.ok) {
                setUser(null);
            }
        })
    }

    return (
        <>
            <div className="topnav">
                <div>
                    <Link to="/">SALESHERO logo</Link>                
                </div>
                <div>
                    <Link to="/">SalesReps</Link>
                </div>
                <div>
                    <Link to="/leads">Leads</Link>
                </div>
                <Link to="/calls">Calls</Link>
                <div>
                    <Button 
                        onClick={handleLogout}className="ms-2" 
                        size='sm' 
                        variant="outline-primary" 
                        type="submit">
                        Logout
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NavBar;