import React from "react"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function LeadSalesRep({name}) {

    
    // const nameString = `\n${name}\n`
    // console.log(nameString)

    return (
            <div>
                {/* <td>{name}</td> */}
                <Container>
                    <Row>
                        <Col>{name}</Col>
                    </Row>

                </Container>
            </div>
            
    )
}

export default LeadSalesRep;