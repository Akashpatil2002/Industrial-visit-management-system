import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Button, Table, Card, Container, Modal, Row, Col, Form } from "react-bootstrap";
import { MdVisibility } from "react-icons/md";

function Notifications() {
  const [requestvisits, setRequestVisits] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [statuses, setStatuses] = useState([]);

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
        console.error('There was an error fetching the request visits!', error);
      });

    axios.get('http://localhost:1010/U1/VisitReg')
      .then(response => {
        setFeedbacks(response.data.feedbacks);
      })
      .catch(error => {
        console.error('There was an error fetching the feedback data!', error);
      });
  };

  const fetchStatuses = () => {
    axios.get('http://localhost:1010/U1/statuses')
      .then(response => {
        setStatuses(response.data); 
      })
      .catch(error => {
        console.error('There was an error fetching the statuses!', error);
      });
  };

  const handleView = (visit) => {
    setSelectedVisit(visit);
    setShowModal(true);
  };

  const handleRejectRequest = () => {
    if (rejectionReason.trim() === "") {
      alert("Please provide a reason for rejection.");
      return;
    }

    const statusData = {
      visitId: selectedVisit._id,
      status: "Rejected",
      reason: rejectionReason,
    };

    axios.post('http://localhost:1010/U1/status', statusData)
      .then(response => {
        console.log("Request rejected:", response.data);
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

  const handleCloseModal = () => {
    setShowModal(false);
    setRejectionReason("");
  };

  return (
    <div>
      <Container fluid>
          {/* Table for Statuses */}
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontSize: '18px' , fontWeight:"bold" }}> REQUEST OF STATUS</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th style={{fontFamily: "Georgia, serif"}}>SR NO.</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Visit Request Message</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Status</th>
                      <th style={{fontFamily: "Georgia, serif"}}>Reason</th>
                    </tr>
                  </thead>
                  <tbody>
                    {statuses.map((status, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{status.visitId ? status.visitId.Purpose : "N/A"}</td>
                        <td>{status.status}</td>
                        <td>{status.reason || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              </Card.Body>
            </Card>
      </Container>
    </div>
  );
}

export default Notifications;
