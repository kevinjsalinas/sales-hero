import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
            <Navbar bg="light" expand="sm">
                <Container>
                    <Navbar.Brand href="/">SalesHero</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">SalesReps</Nav.Link>
                            <Nav.Link href="/leads">Leads</Nav.Link>
                            <Nav.Link href="/calls">Calls</Nav.Link>
                            <Button onClick={handleLogout}className="ms-2" size='sm' variant="outline-primary" type="submit">Logout</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;