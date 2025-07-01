import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Button, Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import { FaUniversity, FaMoneyBill, FaTags } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';




const Fees = () => {
    const [feeTitle, setFeeTitle] = useState('');
    const [feeAmount, setFeeAmount] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [fees, setFees] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [selectedCollege, setSelectedCollege] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editFeeId, setEditFeeId] = useState(null);

    useEffect(() => {
        fetchFees();
        fetchCollegesWithNoMou();
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

    const fetchCollegesWithNoMou = () => {
        axios.get('http://localhost:1010/U1/colleges-with-no-mou')
            .then(response => {
                setColleges(response.data.colleges);
            })
            .catch(error => {
                console.error('There was an error fetching colleges with MOU not signed!', error);
            });
    };

    const handleAddFee = (e) => {
        e.preventDefault();

        if (!feeTitle || !feeAmount || !selectedCollege) {
            alert('Please fill out all fields');
            return;
        }

        const newFee = {
            Fee_Title: feeTitle,
            Fee_Amount: feeAmount,
            Status: isActive ? 'Active' : 'Inactive',
            College_Name: selectedCollege
        };

        axios.post('http://localhost:1010/U1/feepost', newFee)
            .then(response => {
                setFees([...fees, response.data.fee]);
                resetForm();
            })
            .catch(error => {
                console.error('There was an error adding the fee!', error);
            });

    };

    const handleDeleteFee = async (feeId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this fee?`);
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:1010/U1/feedelete/${feeId}`);
                fetchFees();
            } catch (error) {
                console.error("Error deleting fee:", error);
            }
        }
    };

    const handleEditFee = (fee) => {
        setEditMode(true);
        setEditFeeId(fee._id);
        setFeeTitle(fee.Fee_Title);
        setFeeAmount(fee.Fee_Amount);
        setSelectedCollege(fee.College_Name);
        setIsActive(fee.Status === 'Active');
    };

    const handleUpdateFee = (e) => {
        e.preventDefault();

        if (window.confirm('Are you sure you want to update this fee?')) {

            if (!feeTitle || !feeAmount || !selectedCollege) {
                alert('Please fill out all fields');
                return;
            }

            const updatedFee = {
                Fee_Title: feeTitle,
                Fee_Amount: feeAmount,
                Status: isActive ? 'Active' : 'Inactive',
                College_Name: selectedCollege
            };

            axios.put(`http://localhost:1010/U1/feeupdate/${editFeeId}`, updatedFee)
                .then(response => {
                    setFees(fees.map(fee => fee._id === editFeeId ? response.data.updatedFee : fee));
                    resetForm();
                })
                .catch(error => {
                    console.error('There was an error updating the fee!', error);
                });
        }
    };

    const resetForm = () => {
        setFeeTitle('');
        setFeeAmount('');
        setSelectedCollege('');
        setIsActive(true);
        setEditMode(false);
        setEditFeeId(null);
    };

    return (


        <Container fluid style={{ fontFamily: "Georgia, serif" }}>
            <Row>
                <Col md="12">
                    <Card className="shadow-sm rounded-3">
                        <Card.Header className=" text-white" style={{ backgroundColor: "#212529ed" }}>
                            <Card.Title as="h4" style={{ color: "white", fontWeight: "bold" }}>🎓 Fees Management</Card.Title>
                            <p className="card-category" style={{color:"lightgray"}}>Add or update fee information below</p>
                        </Card.Header>
                        <Card.Body className="px-4 py-3">
                            <Form onSubmit={editMode ? handleUpdateFee : handleAddFee}>
                                <Form.Group controlId="formCollege" className="mb-3">
                                    <Form.Label><FaUniversity /> College</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter College"
                                        value={selectedCollege}
                                        onChange={(e) => setSelectedCollege(e.target.value)}
                                        disabled={editMode}
                                    >

                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="formTitle" className="mb-3">
                                    <Form.Label><FaTags /> Fee Title</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter title"
                                        value={feeTitle}
                                        onChange={(e) => setFeeTitle(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formAmount" className="mb-3">
                                    <Form.Label><FaMoneyBill /> Fee Amount</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Enter amount"
                                        value={feeAmount}
                                        onChange={(e) => setFeeAmount(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4 d-flex align-items-center gap-3">
                                    <Form.Label className="mb-0" style={{color:"red"}}>STATUS:</Form.Label>
                                    <Form.Check
                                        type="switch"
                                        id="status-switch"
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                        label={isActive ? 'Active' : 'Inactive'}
                                        
                                    />
                                </Form.Group>


                                <div className="d-flex gap-3">
                                    <Button variant={editMode ? "warning" : "success"} type="submit">
                                        {editMode ? 'Update Fee' : 'Add Fee'}
                                    </Button>
                                    {editMode && (
                                        <Button style={{ marginLeft: "20px" }} variant="secondary" onClick={() => window.location.reload()}>
                                            Cancel
                                        </Button>
                                    )}
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md="12">
                    <Card className="shadow-sm rounded-3">
                        <Card.Header className=" text-white" style={{ backgroundColor: "#212529ed" }}>
                            <Card.Title as="h4" style={{ color: "white", marginBottom: "10px", fontWeight: "bold" }}>📋 Fees List</Card.Title>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table hover striped responsive>
                                <thead className="text-center">
                                    <tr>
                                        <th>SR NO.</th>
                                        <th>College Name</th>
                                        <th>Title</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {fees.map((fee, index) => (
                                        <tr key={fee._id}>
                                            <td >{index + 1}</td>
                                            <td>{fee.College_Name}</td>
                                            <td >{fee.Fee_Title}</td>
                                            <td >₹{fee.Fee_Amount}</td>
                                            <td >
                                                <span className={`badge ${fee.Status === "Active" ? "bg-success" : "bg-danger"}`}>
                                                    {fee.Status}
                                                </span>
                                            </td>
                                            <td >
                                                <div className="d-flex  gap-2">
                                                    <Button size="sm" variant="outline-primary" style={{ color: "blue" }} onClick={() => handleEditFee(fee)}>
                                                        <MdEdit />
                                                    </Button>
                                                    <Button size="sm" variant="outline-danger" style={{ marginLeft: "20px", color: "red" }} onClick={() => handleDeleteFee(fee._id)}>
                                                        <MdDelete />
                                                    </Button>

                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Fees;
=======
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
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
