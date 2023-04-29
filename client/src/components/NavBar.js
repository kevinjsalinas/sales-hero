import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



function NavBar() {
    return (
        <>
            <Navbar bg="light" expand="sm">
                <Container>
                    <Navbar.Brand href="/salesreps">SalesHero</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/salesreps">SalesReps</Nav.Link>
                            <Nav.Link href="/leads">Leads</Nav.Link>
                            <Nav.Link href="/calls">Calls</Nav.Link>
                            <Nav.Link href="/logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default NavBar;