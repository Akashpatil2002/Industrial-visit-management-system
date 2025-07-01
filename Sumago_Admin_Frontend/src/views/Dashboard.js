import React, { useEffect, useState } from "react";
import {
<<<<<<< HEAD
  Modal,
=======
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

import {
  Modal,
  Carousel,
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  Table,
  ModalHeader,
  ModalBody,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import axios from 'axios';
import { FaUniversity, FaCalendarWeek, FaCalendarAlt, FaHistory, FaHandshake } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Dashboard() {
  const [data, setData] = useState([]);
=======
import { format } from "date-fns";
import axios from "axios";
import {
  FaUniversity,
  FaCalendarWeek,
  FaCalendarAlt,
  FaFileSignature,
  FaHistory,
  FaImage,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  const [collegeVisits, setCollegeVisits] = useState([]);
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
  const [weekCount, setWeekCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);
  const [colleges, setColleges] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [weekColleges, setWeekColleges] = useState([]);
  const [monthColleges, setMonthColleges] = useState([]);
  const [signedMouCount, setSignedMouCount] = useState(0);
  const [signedColleges, setSignedColleges] = useState([]);
<<<<<<< HEAD
  const [unsignedMouCount, setUnsignedMouCount] = useState(0);
  const [unsignedColleges, setUnsignedColleges] = useState([]);

  const cardGradients = [
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #3b82f6 0%, #6366f6 100%)",
=======
  const [feedbackImages, setFeedbackImages] = useState([]);


   // Sample visits data - replace with your actual data
   const visitsData = [
    { Visit_Date: 'Jan', Visit_Count: 400 },
    { Visit_Date: 'Feb', Visit_Count: 300 },
    { Visit_Date: 'Mar', Visit_Count: 600 },
    { Visit_Date: 'Apr', Visit_Count: 800 },
    { Visit_Date: 'May', Visit_Count: 500 },
    { Visit_Date: 'Jun', Visit_Count: 900 },
    { Visit_Date: 'Jul', Visit_Count: 1000 },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:1010/U1/all-accepted-visits"),
          axios.get("http://localhost:1010/U1/accepted-visits-current-week"),
          axios.get("http://localhost:1010/U1/accepted-visits-current-month"),
          axios.get("http://localhost:1010/U1/last-five-accepted-colleges"),
          axios.get("http://localhost:1010/U1/signed-mou-colleges"),
          axios.get("http://localhost:1010/U1/VisitReg"),
        ]);
        setCollegeVisits(responses[0].data.collegeVisits);
        setWeekCount(responses[1].data.count);
        setWeekColleges(responses[1].data.collegeVisits);
        setMonthCount(responses[2].data.count);
        setMonthColleges(responses[2].data.collegeVisits);
        setColleges(responses[3].data.lastFiveColleges);
        setSignedMouCount(responses[4].data.count);
        setSignedColleges(responses[4].data.colleges);
        setFeedbackImages(responses[5].data.feedbacks);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const cardGradients = [
    "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    "linear-gradient(135deg, #10b981 0%, #3b82f6 100%)",
    "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  ];

<<<<<<< HEAD
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [weekResponse, monthResponse, lastFiveResponse, signedResponse, unsignedResponse, feesResponse] = await Promise.all([
          axios.get('http://localhost:1010/U1/accepted-visits-current-week'),
          axios.get('http://localhost:1010/U1/accepted-visits-current-month'),
          axios.get('http://localhost:1010/U1/last-five-accepted-colleges'),
          axios.get('http://localhost:1010/U1/signed-mou-colleges'),
          axios.get('http://localhost:1010/U1/unsigned-mou-colleges'),
          axios.get('http://localhost:1010/U1/feeReg')
        ]);

        setWeekCount(weekResponse.data.count);
        setWeekColleges(weekResponse.data.collegeVisits || []);
        setMonthCount(monthResponse.data.count);
        setMonthColleges(monthResponse.data.collegeVisits || []);
        setColleges(lastFiveResponse.data.lastFiveColleges || []);
        setSignedMouCount(signedResponse.data.count);
        setSignedColleges(signedResponse.data.colleges || []);
        setUnsignedMouCount(unsignedResponse.data.count);
        setUnsignedColleges(unsignedResponse.data.colleges || []);
        setData(feesResponse.data.fees || []);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchCounts();
  }, []);

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <Container fluid className="px-4 py-4">
      <Row className="g-4 mb-4">
        {/* This Week Card */}
        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "12px",
              minHeight: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Body className="text-center p-4">
              <div
                className="icon-shape rounded-circle p-3 mb-3 mx-auto"
                style={{
                  background: cardGradients[0],
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaCalendarWeek size={24} className="text-white" />
              </div>
              <h5 className="mb-1">THIS WEEK</h5>
              <h2 className="mb-2">{weekCount}</h2>
              <p className="text-muted mb-0">College visits this week</p>
=======
  return (
    <Container fluid className="px-4 py-4">
      <Row className="g-4 ">
        <Col lg={3} md={6}>
          <Card
            className="border-0 hover-lift"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="icon-shape rounded-3 p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{
                    background: cardGradients[0],
                    width: "56px",
                    height: "56px",
                  }}
                >
                  <FaCalendarWeek size={20} className="text-white" />
                </div>
                <div>
                  <h6 className="text-muted fw-normal">This Week</h6>
                  <h3 className="mt-2 mb-0 text-dark">{weekCount}</h3>
                </div>
              </div>
              <p className="text-muted mb-0 small">College visits this week</p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card
            className="border-0 hover-lift"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="icon-shape rounded-3 p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{
                    background: cardGradients[1],
                    width: "56px",
                    height: "56px",
                  }}
                >
                  <FaCalendarAlt size={20} className="text-white" />
                </div>
                <div>
                  <h6 className="text-muted fw-normal">This Month</h6>
                  <h3 className="mt-2 mb-0 text-dark">{monthCount}</h3>
                </div>
              </div>
              <p className="text-muted mb-0 small">College visits this month</p>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
            </Card.Body>
          </Card>
        </Col>

<<<<<<< HEAD
        {/* This Month Card */}
        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "12px",
              minHeight: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Body className="text-center p-4">
              <div
                className="icon-shape rounded-circle p-3 mb-3 mx-auto"
                style={{
                  background: cardGradients[1],
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaCalendarAlt size={24} className="text-white" />
              </div>
              <h5 className="mb-1">THIS MONTH</h5>
              <h2 className="mb-2">{monthCount}</h2>
              <p className="text-muted mb-0">College visits this month</p>
=======
        <Col lg={3} md={6}>
          <Card
            className="border-0 hover-lift"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="icon-shape rounded-3 p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{
                    background: cardGradients[2],
                    width: "56px",
                    height: "56px",
                  }}
                >
                  <FaHistory size={20} className="text-white" />
                </div>
                <div>
                  <h6 className=" text-muted fw-normal">Recent</h6>
                  <h3 className="mt-2 mb-0 text-dark">{colleges.length}</h3>
                </div>
              </div>
              <p className="text-muted mb-0 small">Last 5 visited colleges</p>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
            </Card.Body>
          </Card>
        </Col>

<<<<<<< HEAD
        {/* Recent Card */}
        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "12px",
              minHeight: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Body className="text-center p-4">
              <div
                className="icon-shape rounded-circle p-3 mb-3 mx-auto"
                style={{
                  background: cardGradients[2],
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaHistory size={24} className="text-white" />
              </div>
              <h5 className="mb-1">RECENT</h5>
              <h2 className="mb-2">{colleges.length}</h2>
              <p className="text-muted mb-0">Last 5 visited colleges</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Signed MOU Card */}
        <Col lg={3} md={6}>
          <Card
            className="border-0 shadow-sm"
            style={{
              borderRadius: "12px",
              minHeight: "160px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Card.Body className="text-center p-4">
              <div
                className="icon-shape rounded-circle p-3 mb-3 mx-auto"
                style={{
                  background: cardGradients[3],
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FaHandshake size={24} className="text-white" />
              </div>
              <h5 className="mb-1">SIGNED</h5>
              <h2 className="mb-2">{signedMouCount}</h2>
              <p className="text-muted mb-0">Colleges with signed MOU</p>
=======
        <Col lg={3} md={6}>
          <Card
            className="border-0 hover-lift"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              cursor: "pointer",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            <Card.Body className="p-4 d-flex flex-column">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="icon-shape rounded-3 p-3 me-3 d-flex align-items-center justify-content-center"
                  style={{
                    background: cardGradients[3],
                    width: "56px",
                    height: "56px",
                  }}
                >
                  <FaFileSignature size={20} className="text-white" />
                </div>
                <div>
                  <h6 className="text-muted fw-normal">Signed</h6>
                  <h3 className="mt-2 mb-0 text-dark">{signedMouCount}</h3>
                </div>
              </div>
              <p className="text-muted mb-0 small">Colleges with signed MOU</p>
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
            </Card.Body>
          </Card>
        </Col>
      </Row>

<<<<<<< HEAD
      {/* {/ Graph /} */}

        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Fees</Card.Title>
                <p className="card-category">Fees Analysis</p>
              </Card.Header>
              <Card.Body>
                <div style={{ height: 400 }}>
                  <ResponsiveContainer>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="Fee_Title" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="Fee_Amount" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">List of Non-signed MOU Colleges</Card.Title>
                <p className="card-category">Number of Non-signed MOU Colleges: {unsignedMouCount}</p>
              </Card.Header>
              <Card.Body>
                <div style={{ width: '100%' }}>
                  <Table className="table-hover table-striped">
                    <thead>
                      <tr>
                        <th>Sr.No</th>
                        <th>College Name</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {unsignedColleges.map((college, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{college.College_Name}</td>
                        
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

=======
      <Row>
      <Col md="6">
        <Card>
          <Card.Header>
            <Card.Title as="h4">Visits Overview</Card.Title>
            <p className="card-category">Visits Analysis</p>
          </Card.Header>
          <Card.Body>
            <div style={{ height: 400 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Visit_Date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Visit_Count" 
                    stroke="#82ca9d" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card.Body>
        </Card>
      </Col>


        <Col md={6}>
          <Card
            className="border-0 h-100"
            style={{
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              backgroundColor: "#ffffff",
              height: "100%",
              minHeight: "380px", 
            }}
          >
            <Card.Body className="p-0 d-flex flex-column h-100">
              {feedbackImages.length > 0 ? (
                <>
                  <div className="d-flex justify-content-between align-items-center p-4">
                    <h5 className="mb-0 text-dark fw-semibold">
                      Visit Gallery
                    </h5>
                    <div className="text-muted small">
                      <FaImage className="me-1" /> {feedbackImages.length}{" "}
                      images
                    </div>
                  </div>
                  <div style={{ flex: 1 }} className="overflow-hidden">
                    <Carousel
                      indicators={feedbackImages.length > 1}
                      interval={3000}
                      controls={feedbackImages.length > 1}
                      className="h-100"
                    >
                      {feedbackImages.map((image, index) => (
                        <Carousel.Item key={index} className="h-100">
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <img
                              className="d-block w-100 h-100 object-cover"
                              src={`http://localhost:1010/${image.Image1}`}
                              alt={`Visit ${index + 1}`}
                              style={{
                                objectFit: "cover",
                                maxHeight: "300px",
                                width: "100%",
                              }}
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                </>
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100 p-4">
                  <div
                    className="icon-shape rounded-3 p-4 mb-3 bg-light"
                    style={{
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    }}
                  >
                    <FaImage size={32} className="text-muted" />
                  </div>
                  <h6 className="text-muted mb-1">No images available</h6>
                  <p className="text-muted small mb-0 text-center">
                    Visit images will appear here once uploaded
                  </p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add your modals here */}
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
    </Container>
  );
}

<<<<<<< HEAD
export default Dashboard;
=======
export default Dashboard;
>>>>>>> a3455f55b863ce23c7146bb47bef15beccfd15e4
