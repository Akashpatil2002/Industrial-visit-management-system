import React from "react";
import { Badge, Button, Navbar, Nav, Container,Card } from "react-bootstrap";

function Maps() {


  return (
    <Container fluid>
      <Card>
        <Card.Header>
          <Card.Title as="h4">Map</Card.Title>
          <p className="card-category">
            <div style={{ height:"700px", width: "100%" }}>

              <iframe
                src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d119986.76686165298!2d73.69907270484745!3d19.983886168798957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3bddebaead9a4d49%3A0xfd6c10f8929d7902!2sThe%20Avenue%2C%20behind%20Prakash%20Petrol%20Pump%2C%20Mumbai%20Naka%2C%20Govind%20Nagar%2C%20Nashik%2C%20Maharashtra%20422009!3m2!1d19.9839052!2d73.7814744!5e0!3m2!1sen!2sin!4v1722934114085!5m2!1sen!2sin"
                title="Example Website"
                style={{ border: 'none', height:"100%", width:"100%" }}
              ></iframe>
            </div>
          </p>
        </Card.Header>
      </Card>
      </Container>
      );
}

      export default Maps;
