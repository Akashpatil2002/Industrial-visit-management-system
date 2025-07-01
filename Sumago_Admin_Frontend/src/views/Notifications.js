import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Table, Card, Container, Modal, Row, Col, Form } from "react-bootstrap";
<<<<<<< HEAD
import { MdVisibility, MdEdit, MdDelete } from "react-icons/md";
=======
import { MdVisibility } from "react-icons/md";
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

function Notifications() {
  const [requestvisits, setRequestVisits] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
<<<<<<< HEAD
  const [statuses, setStatuses] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [selectedVisit1, setSelectedVisit1] = useState(null);
  const [editingStatus, setEditingStatus] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newReason, setNewReason] = useState("");
  const [rejectionReason, setRejectionReason] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
=======
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [statuses, setStatuses] = useState([]);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

  useEffect(() => {
    fetchRequestVisits();
    fetchStatuses();
  }, []);

  const fetchRequestVisits = () => {
    axios.get('http://localhost:1010/U1/ColvisitReg')
      .then(response => {
        setRequestVisits(response.data.requestvisits);
      })
      .catch(error => {
<<<<<<< HEAD
        console.error('Error fetching request visits!', error);
=======
        console.error('There was an error fetching the request visits!', error);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
      });

    axios.get('http://localhost:1010/U1/VisitReg')
      .then(response => {
        setFeedbacks(response.data.feedbacks);
      })
      .catch(error => {
<<<<<<< HEAD
        console.error('Error fetching feedbacks!', error);
=======
        console.error('There was an error fetching the feedback data!', error);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
      });
  };

  const fetchStatuses = () => {
    axios.get('http://localhost:1010/U1/statuses')
      .then(response => {
<<<<<<< HEAD
        setStatuses(response.data);
      })
      .catch(error => {
        console.error('Error fetching statuses:', error);
=======
        setStatuses(response.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the statuses!', error);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
      });
  };

  const handleView = (visit) => {
    setSelectedVisit(visit);
    setShowModal(true);
  };

<<<<<<< HEAD
  const handleView1 = (visit1) => {
    setSelectedVisit1(visit1);
    setShowModal1(true);
  };

  const handleEditClick = (status) => {
    setEditingStatus(status);
    setNewStatus(status.status);
    setNewReason(status.reason);
    setShowEditModal(true);
  };

  const handleDeleteClick = (status) => {
    setEditingStatus(status);
    setShowDeleteModal(true);
  };

  const handleDeleteStatus = () => {
    if (editingStatus) {
      axios.delete(`http://localhost:1010/U1/status/${editingStatus._id}`)
        .then(() => {
          fetchStatuses();
          setShowDeleteModal(false);
        })
        .catch(error => {
          console.error('Error deleting status:', error);
        });
    }
  };

  const handleSaveEdit = () => {
    if (newStatus === "Rejected" && !newReason) {
      alert("Please provide a reason for rejection."); // You can replace this with a more user-friendly notification
      return;
    }
    axios.put(`http://localhost:1010/U1/status/${editingStatus._id}`, {
      status: newStatus,
      reason: newReason
    })
      .then(() => {
        fetchStatuses();
        setShowEditModal(false);
      })
      .catch(error => {
        console.error('Error updating status:', error);
      });
  };

  const handleRejectRequest = () => {
  if (rejectionReason.length === 0 || !rejectionReason[0].trim()) {
    alert("Please provide a reason for rejection.");
    return;
  }

  if (window.confirm("Are you sure you want to reject this request?")) {
=======
  const handleRejectRequest = () => {
    if (rejectionReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    const statusData = {
      visitId: selectedVisit._id,
      status: "Rejected",
      reason: rejectionReason,
    };

    axios.post('http://localhost:1010/U1/status', statusData)
      .then(response => {
        console.log("Request rejected:", response.data);
<<<<<<< HEAD
        fetchStatuses();
        setShowModal(false);
        setRejectionReason("");
        fetchRequestVisits();
      })
      .catch(error => {
        console.error('Error rejecting the request!', error);
      });
  }
};
  

  const handleAcceptRequest = () => {
    if (window.confirm("Are you sure you want to accept this request?")) {
      const statusData = {
        visitId: selectedVisit._id,
        status: "Accepted",
        reason: "",
      };
  
      axios.post('http://localhost:1010/U1/status', statusData)
        .then(response => {
          console.log("Request accepted:", response.data);
          fetchStatuses();  
          setShowModal(false);
          fetchRequestVisits(); 
        })
        .catch(error => {
          console.error('Error accepting the request!', error);
        });
    }
  };

=======
        fetchStatuses(); 
        setShowModal(false);
        setRejectionReason("");
      })
      .catch(error => {
        console.error('There was an error rejecting the request!', error);
      });
  };

  const handleAcceptRequest = () => {
    const statusData = {
      visitId: selectedVisit._id,
      status: "Accepted",
      reason: "",
    };

    axios.post('http://localhost:1010/U1/status', statusData)
      .then(response => {
        console.log("Request accepted:", response.data);
        fetchStatuses(); 
        setShowModal(false);
      })
      .catch(error => {
        console.error('There was an error accepting the request!', error);
      });
  };
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4

  const handleCloseModal = () => {
    setShowModal(false);
    setRejectionReason("");
  };

<<<<<<< HEAD
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setNewStatus("");
    setNewReason("");
  };

  const getVisibleRequestVisits = () => {
    return requestvisits.filter(requestvisit => {
      return !statuses.some(status => status.visitId._id === requestvisit._id);
    });
  };

  return (
    <div>
      <Container fluid>
        <Row>
          {/* Request Visits Section */}
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ fontFamily: "Georgia, serif"}}>View Visit Request Notifications</Card.Title>
=======
  return (
    <div>
      <Container fluid>
          {/* Table for Statuses */}
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontSize: '18px' , fontWeight:"bold" }}> REQUEST OF STATUS</Card.Title>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
              </Card.Header>
              <Card.Body>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
<<<<<<< HEAD
                      <th>SR NO.</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getVisibleRequestVisits().map((requestvisit, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{requestvisit.Purpose}</td>
                        <td style={{ display: "flex", gap: "16px" }}>
                          <MdVisibility onClick={() => handleView(requestvisit)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
          {/* Feedback Section */}
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ fontFamily: "Georgia, serif"}}>View Feedback Notifications</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>SR NO.</th>
                      <th>Message</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map((feedback, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{feedback.Feedback_Message}</td>
                        <td style={{ display: "flex", gap: "16px" }}>
                          <MdVisibility onClick={() => handleView1(feedback)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Status Section */}
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ fontFamily: "Georgia, serif"}}>Status of Requests</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th>SR NO.</th>
                      <th>Visit Request Message</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Actions</th>
=======
                      <th style={{fontFamily: "Georgia, serif"}}>SR NO.</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Visit Request Message</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Status</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Reason</th>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
                    </tr>
                  </thead>
                  <tbody>
                    {statuses.map((status, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{status.visitId ? status.visitId.Purpose : "N/A"}</td>
                        <td>{status.status}</td>
                        <td>{status.reason || "N/A"}</td>
<<<<<<< HEAD
                        <td style={{ display: "flex", gap: "16px" }}>
                          <MdEdit onClick={() => handleEditClick(status)} />
                          <MdDelete onClick={() => handleDeleteClick(status)} />
                        </td>
=======
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
                      </tr>
                    ))}
                  </tbody>
                </Table>
<<<<<<< HEAD
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Modal for viewing request details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header>
          <Modal.Title>Notification Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVisit ? (
            <div>
              <p><strong>No Of Students:</strong> {selectedVisit.Num_of_Students}</p>
              <p><strong>Date Of Visit:</strong> {selectedVisit.Visit_Date}</p>
              <p><strong>Time Slot:</strong> {selectedVisit.Time_Slot}</p>
              <p><strong>Number Of Faculty with Students:</strong> {selectedVisit.No_of_Faculty}</p>
              <p><strong>Purpose:</strong> {selectedVisit.Purpose}</p>
              <p><strong>Any Comment:</strong> {selectedVisit.Comment}</p>
              <p><strong>PDF:</strong></p>
              {selectedVisit.Image && (
                <embed
                  src={`http://localhost:1010/${selectedVisit.Image}`}
                  type="application/pdf"
                  style={{ width: "100%", height: "400px" }} />
              )}
              <Form.Group controlId="rejectionReason">
                <Form.Label>Reason for Rejection:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                />
              </Form.Group>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="success" onClick={handleAcceptRequest}>Accept Request</Button>
          <Button variant="danger" onClick={handleRejectRequest}>Reject Request</Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for viewing feedback details */}
      <Modal show={showModal1} onHide={setShowModal1} size="lg">
        <Modal.Header>
          <Modal.Title>Feedback Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVisit1 ? (
            <div>
              <p><strong>Visit ID:</strong> {selectedVisit1.VisitId}</p>
              <p><strong>Date Of Visit:</strong> {selectedVisit1.Visit_Date}</p>
              <p><strong>Feedback Message:</strong> {selectedVisit1.Feedback_Message}</p>
              <div>
                <strong>Image:</strong>
                {selectedVisit1.Image1 && (
                  <img
                    src={`http://localhost:1010/${selectedVisit1.Image1}`}
                    alt="Feedback"
                    style={{ width: "100%", height: "400px" }} />
                )}
              </div>
            </div>
          ) : (
            <p>No details available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setShowModal1}>Close</Button>
        </Modal.Footer>
      </Modal>


      {/* Modal for editing status */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
  <Modal.Header closeButton>
    <Modal.Title>Edit Status</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group controlId="statusInput">
      <Form.Label>Status:</Form.Label>
      <Form.Control
        as="select"
        value={newStatus}
        onChange={(e) => {
          setNewStatus(e.target.value);
          if (e.target.value !== "Rejected") {
            setNewReason(""); // Reset reason if not rejected
          }
        }}
      >
        <option value="">Select...</option>
        <option value="Accepted">Accepted</option>
        <option value="Rejected">Rejected</option>
      </Form.Control>
    </Form.Group>
    {newStatus === "Rejected" && (
      <Form.Group controlId="reasonInput">
        <Form.Label>Reason for Rejection:</Form.Label>
        <Form.Control
          type="text"
          value={newReason}
          onChange={(e) => setNewReason(e.target.value)}
        />
      </Form.Group>
    )}
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
  </Modal.Footer>
</Modal>


      {/* Modal for confirming delete */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this status?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button variant="danger" onClick={handleDeleteStatus}>Delete</Button>
        </Modal.Footer>
      </Modal>
=======

              </Card.Body>
            </Card>
      </Container>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    </div>
  );
}

export default Notifications;
