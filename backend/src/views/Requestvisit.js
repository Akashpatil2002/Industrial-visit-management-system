import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import "./Requestvisit.css";  // Import the CSS file


const Requestvisit = () => {
  const [no_of_Student, setNoofStudent] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [no_of_Faculty, setNoofFaculty] = useState('');
  const [purpose, setPurpose] = useState('');
  const [comment, setComment] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [img1, setImg] = useState(null);
  const [requestvisits, setRequestVisits] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editRequestVisitId, setEditRequestVisitId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    fetchRequestVisits();
  }, []);

  const fetchRequestVisits = () => {
    axios.get('http://localhost:1010/U1/ColvisitReg')
      .then(response => {
        setRequestVisits(response.data.requestvisits);
      })
      .catch(error => {
        console.error('There was an error fetching the agenda data!', error);
      });
  };

  const handleAddRequestVisit = (e) => {
    e.preventDefault();

    const newRequestVisit = new FormData();
    newRequestVisit.append('Num_of_Students', no_of_Student);
    newRequestVisit.append('Visit_Date', visitDate);
    newRequestVisit.append('Time_Slot', timeSlot);
    newRequestVisit.append('No_of_Faculty', no_of_Faculty);
    newRequestVisit.append('Purpose', purpose);
    newRequestVisit.append('Comment', comment);
    newRequestVisit.append('College_Name', collegeName);
    newRequestVisit.append('Image', img1);

    axios.post('http://localhost:1010/U1/Colvisitpost', newRequestVisit)
      .then(response => {
        if (response.data && response.data.requestvisit) {
          setRequestVisits([...requestvisits, response.data.requestvisit]);
          resetForm();
        }
      })
      .catch(error => {
        console.error('There was an error adding the request!', error);
      });
  };

  const handleDeleteRequestVisit = (visitDate) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this visit request?");
    if (confirmDelete) {
      axios.delete(`http://localhost:1010/U1/ColvisitDel/${visitDate}`)
        .then(response => {
          setRequestVisits(requestvisits.filter(requestvisit => requestvisit.Visit_Date !== visitDate));
        })
        .catch(error => {
          console.error('There was an error deleting the request!', error);
        });
    }
  };

  const handleEditRequestVisit = (requestvisit) => {
    setEditMode(true);
    setEditRequestVisitId(requestvisit._id);
    setNoofStudent(requestvisit.Num_of_Students);
    setVisitDate(requestvisit.Visit_Date);
    setTimeSlot(requestvisit.Time_Slot);
    setNoofFaculty(requestvisit.No_of_Faculty);
    setPurpose(requestvisit.Purpose);
    setComment(requestvisit.Comment);
    setCollegeName(requestvisit.College_Name);
    setImg(requestvisit.Image);
  };

  const handleUpdateRequestVisit = () => {
    if (window.confirm("Are you sure you want to update this visit request?")) {
      const updatedRequestVisit = new FormData();
      updatedRequestVisit.append('Num_of_Students', no_of_Student);
      updatedRequestVisit.append('Visit_Date', visitDate);
      updatedRequestVisit.append('Time_Slot', timeSlot);
      updatedRequestVisit.append('No_of_Faculty', no_of_Faculty);
      updatedRequestVisit.append('Purpose', purpose);
      updatedRequestVisit.append('Comment', comment);
      updatedRequestVisit.append('College_Name', collegeName);
      updatedRequestVisit.append('Image', img1);

      axios.put(`http://localhost:1010/U1/Colvisitupdate/${editRequestVisitId}`, updatedRequestVisit)
        .then(response => {
          const updatedRequestVisits = requestvisits.map(requestvisit => {
            if (requestvisit._id === editRequestVisitId) {
              return { ...requestvisit, ...response.data.requestvisit };
            }
            return requestvisit;
          });
          setRequestVisits(updatedRequestVisits);
          resetForm();
          setEditMode(false);
          setEditRequestVisitId(null);
        })
        .catch(error => {
          console.error('There was an error updating the request!', error);
        });
    }
  };

  const resetForm = () => {
    setNoofStudent('');
    setVisitDate('');
    setTimeSlot('');
    setNoofFaculty('');
    setPurpose('');
    setComment('');
    setCollegeName('');
    setImg(null);
  };

  return (
    <Container fluid style={{ fontFamily: "Georgia, serif" }}>
      {/* Request Form */}
      <Row className="my-4">
        <Col md="12">
          <Card className="shadow-lg border-0">
            <Card.Header className=" text-white" style={{ backgroundColor: "#212529ed" }}>
              <Card.Title as="h4" style={{ color: "white", marginBottom: "5px", fontWeight: "bold" }} >REQUEST VISIT</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={editMode ? handleUpdateRequestVisit : handleAddRequestVisit}>
                <Row className="g-0"> {/* Removed gap */}
                  <Col md={6}>
                    <Form.Group controlId="formCollegeName">
                      <Form.Label>College Name (Visit ID)</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter College Name"
                        value={collegeName}
                        onChange={(e) => setCollegeName(e.target.value)}
                           className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTitle">
                      <Form.Label>Number of Students</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Number of Students"
                        value={no_of_Student}
                        onChange={(e) => setNoofStudent(e.target.value)}
                       className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-0 my-2"> {/* Adjusted gap */}
                  <Col md={6}>
                    <Form.Group controlId="formDescription">
                      <Form.Label>Visit Date</Form.Label>
                      <Form.Control
                        type="date"
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formTime">
                      <Form.Label>Time Slot</Form.Label>
                      <Form.Control
                        type="time"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                      className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-0"> {/* Removed gap */}
                  <Col md={6}>
                    <Form.Group controlId="formFaculty">
                      <Form.Label>Number of Faculty</Form.Label>
                      <Form.Control
                        type="number"
                        value={no_of_Faculty}
                        onChange={(e) => setNoofFaculty(e.target.value)}
                        className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formPurpose">
                      <Form.Label>Purpose</Form.Label>
                      <Form.Control
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                       className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="g-0 my-2"> {/* Adjusted gap */}
                  <Col md={6}>
                    <Form.Group controlId="formComment">
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as="textarea"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                       className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formImg">
                      <Form.Label>Upload PDF</Form.Label>
                      <Form.Control
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setImg(e.target.files[0])}
                      className="hover-field"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="text-center my-4" >
                  <button variant="success" type="submit" className="btn btn-primary" style={{width:"200px" ,fontWeight: "bold"}}>
                    {editMode ? 'UPDATE' : 'SEND REQUEST '}
                  </button>
                </div>
              </Form>

            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Request List */}
      <Row>
        <Col md="12">
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-dark text-white">
              <Card.Title as="h4" style={{ color: "white", marginBottom: "5px", fontWeight: "bold" }}>VISIT REQUESTS</Card.Title>
            </Card.Header>
            <Card.Body className="table-responsive">
              <Table striped hover>
                <thead className="bg-light text-center">
                  <tr >
                    <td style={{fontFamily: "Georgia, serif"}}>Sr No.</td>
                    <td style={{fontFamily: "Georgia, serif"}}>College Name</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Students</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Visit Date</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Time Slot</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Faculty</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Purpose</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Comment</td>
                    <td style={{fontFamily: "Georgia, serif"}}>PDF</td>
                    <td style={{fontFamily: "Georgia, serif"}}>Actions</td>
                  </tr>
                </thead>
                <tbody style={{textAlign:"center"}}>
                  {requestvisits.map((requestvisit, index) => (
                    <tr key={requestvisit._id}>
                      <td style={{color:"#909090"}}>{index + 1}</td>
                      <td style={{color:"#909090"}}>{requestvisit.College_Name}</td>
                      <td style={{color:"#909090"}}>{requestvisit.Num_of_Students}</td>
                      <td style={{color:"#909090"}}>{new Date(requestvisit.Visit_Date).toLocaleDateString()}</td>
                      <td style={{color:"#909090"}}>{requestvisit.Time_Slot}</td>
                      <td style={{color:"#909090"}}>{requestvisit.No_of_Faculty}</td>
                      <td style={{color:"#909090"}}>{requestvisit.Purpose}</td>
                      <td style={{color:"#909090"}}>{requestvisit.Comment}</td>
                      <td>
                        <a href={`http://localhost:1010/${requestvisit.Image}`} target="_blank" rel="noopener noreferrer">
                          View
                        </a>
                      </td>
                      <td>
                       
                        <MdEdit style={{color:"blue"}} onClick={() => handleEditRequestVisit(requestvisit)} />
                        <MdDelete style={{ color:"red" , marginLeft:"10px"}} onClick={() => handleDeleteRequestVisit(requestvisit.Visit_Date)} />
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

export default Requestvisit;
