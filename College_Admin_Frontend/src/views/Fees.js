import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

const Fees = () => {
  const [fees, setFees] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState({
    amount: 0,
    feeTitle: "",
    collegeName: ""
  });

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = () => {
    axios.get('http://localhost:1010/U1/feeReg')
      .then(response => {
        setFees(response.data.fees);
      })
      .catch(error => {
        console.error('There was an error fetching the fees data!', error);
      });
  };

  const handlePayment = (fee) => {
    setCurrentPayment({
      amount: fee.Fee_Amount,
      feeTitle: fee.Fee_Title,
      collegeName: fee.College_Name
    });
    setShowQRModal(true);
  };

  const handleCloseQRModal = () => {
    setShowQRModal(false);
  };

  // Generate UPI payment link (replace with your actual UPI ID)
  const generateUPILink = () => {
    return `upi://pay?pa=your.upi@id&pn=${currentPayment.collegeName}&am=${currentPayment.amount}&tn=Payment for ${currentPayment.feeTitle}`;
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <Card className="strpied-tabled-with-hover shadow-sm">
            <Card.Header>
              <Card.Title
                as="h4"
                style={{ color: "#212529", marginBottom: "5px", fontWeight: "bold" }}
              >
                Fees List
              </Card.Title>
              <p className="card-category" style={{ color: "blue", fontSize: "13px" }}>
                College Fees
              </p>
            </Card.Header>
            <Card.Body className="table-full-width px-0">
              <div style={{ overflowX: "auto" }}>
                <Table responsive="sm" striped hover>
                  <thead>
                    <tr>
                      <td className="text-center" style={{fontFamily: "Georgia, serif"}}>Sr NO.</td>
                      <td className="text-center" style={{fontFamily: "Georgia, serif"}}>College Name</td>
                      <td className="text-center" style={{fontFamily: "Georgia, serif"}}>Fee Title</td>
                      <td className="text-center" style={{fontFamily: "Georgia, serif"}}>Fee Amount</td>
                      <td className="text-center" style={{fontFamily: "Georgia, serif"}}>Payment</td>
                    </tr>
                  </thead>
                  <tbody>
                    {fees.map((fee, index) => (
                      <tr key={index} style={{fontSize:"14px"}}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{fee.College_Name}</td>
                        <td className="text-center">{fee.Fee_Title}</td>
                        <td className="text-center">{fee.Fee_Amount}</td>
                        <td className="d-flex align-items-center justify-content-center">
                          <Button
                            variant="primary"
                            size="sm" 
                            onClick={() => handlePayment(fee)}
                            className="d-flex align-items-center justify-content-center"
                          >
                            Pay Now
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* QR Code Payment Modal */}
      <Modal show={showQRModal} onHide={handleCloseQRModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Scan to Pay ${currentPayment.amount}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <div className="mb-3">
            <p style={{ fontWeight: "bold" }}>{currentPayment.collegeName}</p>
            <p>{currentPayment.feeTitle}</p>
            <p className="text-success" style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              Amount: {currentPayment.amount}
            </p>
          </div>
          
          <div className="d-flex justify-content-center mb-3">
            <QRCodeSVG
              value={generateUPILink()}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <p className="text-muted small">
            Scan this QR code using any UPI payment app
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseQRModal}>
            Close
          </Button>
          <Button variant="success" onClick={handleCloseQRModal}>
            I've Paid
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Fees;