import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Form, Alert, Image } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import moment from "moment";
import axios from "axios";

const Feedback = () => {
    const [visitID, setVisitID] = useState('');
    const [visitDate, setVisitDate] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [img2, setImg2] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editFeedbackId, setEditFeedbackId] = useState(null);
    const [colleges, setColleges] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchFeedbacks();
        fetchColleges();
    }, []);

    const fetchFeedbacks = async () => {
        try {
            const response = await axios.get('http://localhost:1010/U1/VisitReg');
            setFeedbacks(response.data.feedbacks);
        } catch (error) {
            console.error('Error fetching feedbacks:', error);
        }
    };

    const fetchColleges = async () => {
        try {
            const response = await axios.get('http://localhost:1010/U1/accepted-visits/details');
            setColleges(response.data);
        } catch (error) {
            console.error('Error fetching colleges:', error);
        }
    };

    const handleAddFeedback = async (e) => {
        e.preventDefault();
        if (!visitID || !visitDate || !feedbackMessage) {
            setError('All fields are required.');
            return;
        }
        const newFeedback = new FormData();
        newFeedback.append('VisitId', visitID);
        newFeedback.append('Visit_Date', visitDate);
        newFeedback.append('Feedback_Message', feedbackMessage);
        if (img2) newFeedback.append('Image1', img2);

        try {
            const response = await axios.post('http://localhost:1010/U1/Visitpost', newFeedback);
            setFeedbacks([...feedbacks, response.data.feedbacks]);
            resetForm();
        } catch (error) {
            console.error('Error adding feedback:', error);
        }
    };

    const handleDeleteFeedback = async (id) => {
        if (!window.confirm("Are you sure you want to delete this feedback?")) return;
        try {
            await axios.delete(`http://localhost:1010/U1/VisitDel/${id}`);
            setFeedbacks(feedbacks.filter(f => f.VisitId !== id));
        } catch (error) {
            console.error('Error deleting feedback:', error);
        }
    };

    const handleEditFeedback = (feedback) => {
        setEditMode(true);
        setEditFeedbackId(feedback.VisitId);
        setVisitID(feedback.VisitId);
        setVisitDate(feedback.Visit_Date);
        setFeedbackMessage(feedback.Feedback_Message);
        setImgPreview(`http://localhost:1010/${feedback.Image1}`);
    };

    const handleUpdateFeedback = async () => {
        if (!window.confirm("Are you sure you want to update this feedback?")) return;
        const updatedFeedback = new FormData();
        updatedFeedback.append('VisitId', visitID);
        updatedFeedback.append('Visit_Date', visitDate);
        updatedFeedback.append('Feedback_Message', feedbackMessage);
        if (img2) updatedFeedback.append('Image1', img2);

        try {
            await axios.put(`http://localhost:1010/U1/Visitupdate/${editFeedbackId}`, updatedFeedback);
            resetForm();
            fetchFeedbacks();
        } catch (error) {
            console.error('Error updating feedback:', error);
        }
    };

    const resetForm = () => {
        setVisitID('');
        setVisitDate('');
        setFeedbackMessage('');
        setImg2(null);
        setImgPreview(null);
        setEditMode(false);
        setError('');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImg2(file);
        setImgPreview(URL.createObjectURL(file));
    };

    return (
        <Container fluid>
        <Row className="justify-content-center">
            <Col xs={12} lg={10} xl={8}>
                <Card className="mb-4">
                    <Card.Header className="text-center">
                        <h4 className="fw-bold" style={{ fontFamily: "Georgia, serif" }}>FEEDBACK FORM</h4>
                    </Card.Header>
                    <Card.Body style={{ fontFamily: 'Georgia, serif' }}>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={editMode ? handleUpdateFeedback : handleAddFeedback}>
                            <Row>
                                <Col xs={12} md={4} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>College Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={visitID}
                                            onChange={(e) => setVisitID(e.target.value)}
                                            placeholder="Enter College Name"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Visit Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={visitDate}
                                            onChange={(e) => setVisitDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Upload Image</Form.Label>
                                        <Form.Control type="file" onChange={handleImageChange} />
                                        {imgPreview && <Image src={imgPreview} thumbnail className="mt-2 w-100" />}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={12} className="mb-3">
                                    <Form.Group>
                                        <Form.Label>Feedback Message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            value={feedbackMessage}
                                            onChange={(e) => setFeedbackMessage(e.target.value)}
                                            style={{ height: "150px", overflowY: "auto" }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <center>
                            <Button className="mt-3 w-90" style={{marginBottom:"20px"}} type="submit" variant="primary">
                                {editMode ? 'Update Feedback' : 'Send Feedback'}
                            </Button></center>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs={12} lg={10} xl={8}>
                <Card>
                    <Card.Header className="text-center fw-bold" style={{ fontSize: "20px", fontFamily: "Georgia, serif" }}>FEEDBACK LIST</Card.Header>
                    <Card.Body>
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <td  style={{fontFamily: "Georgia, serif"}} className="text-center">Sr No.</td>
                                    <td  style={{fontFamily: "Georgia, serif"}} className="text-center">College</td>
                                    <td   style={{fontFamily: "Georgia, serif"}} className="text-center">Date</td>
                                    <td  style={{fontFamily: "Georgia, serif"}} className="text-center">Message</td>
                                    <td  style={{fontFamily: "Georgia, serif"}} className="text-center">Image</td>
                                    <td  style={{fontFamily: "Georgia, serif"}} className="text-center">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map((f, index) => (
                                    <tr key={index}>
                                        <td style={{color:"#909090"}} className="text-center align-middle">{index + 1}</td>
                                        <td  style={{color:"#909090"}} className="text-center align-middle">{f.VisitId}</td>
                                        <td style={{color:"#909090"}} className="text-center align-middle">{f.Visit_Date}</td>
                                        <td style={{color:"#909090"}} className="text-center align-middle">{f.Feedback_Message}</td>
                                        <td style={{color:"#909090"}} className="text-center align-middle">
                                            <a href={`http://localhost:1010/${f.Image1}`} target="_blank" rel="noopener noreferrer">
                                                View
                                            </a>
                                        </td>
                                        <td className="text-center align-middle">
                                            <MdEdit style={{ color: "blue", cursor: "pointer" }} onClick={() => handleEditFeedback(f)} />
                                            <MdDelete style={{ color: "red", marginLeft: "10px", cursor: "pointer" }} onClick={() => handleDeleteFeedback(f.VisitId)} />
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

export default Feedback;