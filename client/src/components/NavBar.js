import React, { useContext } from 'react';
// import { Button } from 'react-bootstrap';
import { Button } from 'semantic-ui-react'
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
            <div class="ui large menu ui top fixed menu ui inverted segement">
                <div class="item">
                    <Link to="/">
                        <span className="roboto bolded white logo"> 
                            SALES
                        </span>
                        <span className="roboto white logo">
                            HERO
                        </span>
                    </Link> 
                </div>
                <Link to="/" className="item">SalesReps</Link>
                <Link to="/leads" className="item">Leads</Link>
                <Link to="/calls" className="item">Calls</Link>
                <div class="right menu">
                    <Button 
                        dark
                        onClick={handleLogout}
                        className="ui button item" 
                        type="submit">
                            Logout
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NavBar;