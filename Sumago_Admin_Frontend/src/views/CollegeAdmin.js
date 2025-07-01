import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col, Form } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";
import University from "./University";

const CollegeAdmin = () => {
  const [name, setName] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [university, setUniversity] = useState('');
  const [universities, setUniversities] = useState([]);
  const [principalName, setPrincipalName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contact1, setContact1] = useState('');
  const [contact2, setContact2] = useState('');
  const [email, setEmail] = useState('');
  const [collegeAdminName, setCollegeAdminName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [visitingLocation, setVisitingLocation] = useState('');
  const [isMOUSigned, setIsMOUSigned] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const [coladmins, setColadmins] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editColadminId, setEditColadminId] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');



  useEffect(() => {
    fetchColadmins();
  }, []);

  const fetchColadmins = () => {
    axios.get('http://localhost:1010/U1/AdminColget')
      .then(response => {
        setColadmins(response.data.coladmin);
      })
      .catch(error => {
        console.error('There was an error fetching the college admin data!', error);
      });

    axios.get('http://localhost:1010/U1/AdminActiveStateReg')
      .then(response => {
        setStates(response.data.state);
      })
      .catch(error => {
        console.error('There was an error fetching the state data!', error);
      });

    axios.get('http://localhost:1010/U1/AdminDisReg')
      .then(response => {
        setDistricts(response.data.district);
      })
      .catch(error => {
        console.error('There was an error fetching the district data!', error);
      });

    axios.get('http://localhost:1010/U1/AdminCityReg')
      .then(response => {
        setCities(response.data.city);
      })
      .catch(error => {
        console.error('There was an error fetching the city data!', error);
      });

    axios.get('http://localhost:1010/U1/AdminuniReg')
      .then(response => {
        setUniversities(response.data.university);
      })
      .catch(error => {
        console.error('There was an error fetching the university data!', error);
      });
  };
/* -----------------------------------------add admin-------------------------------------------- */

  const handleAddColadmin = async (e) => {
    e.preventDefault();

    try {
      // Validate form fields
      if (!name || !state || !district || !city || !university || !principalName || !contactPerson || !contact1
        || !contact2 || !email || !collegeAdminName || !password || !confirmPassword || !visitingLocation
      ) {
        alert('Please fill out all required fields');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      console.log('Submitting admin credentials...');
      const credentialsResponse = await axios.post('http://localhost:1010/U1/Colpost', {
        name: collegeAdminName,
        email: email,
        password: password,
      });
      console.log('Credentials response:', credentialsResponse.data);

      const newColadmin = {
        College_Name: name,
        State: state,
        District: district,
        City: city,
        University: university,
        College_PrincipleName: principalName,
        College_ContactPerson: contactPerson,
        College_EmailId: email,
        College_AdminName: collegeAdminName,
        College_Password: password,
        College_ConfirmPassword: confirmPassword,
        College_VisitingLocation: visitingLocation,
        Is_MOU_Sign: isMOUSigned ? 'Signed' : 'Unsigned',
        College_Contact1: contact1,
        College_Contact2: contact2,
        Status: isActive ? 'Active' : 'Inactive'
      };

console.log('Submitting college admin data:', newColadmin);
const adminResponse = await axios.post('http://localhost:1010/U1/AdminColpost', newColadmin);
console.log('Admin response:', adminResponse.data);
if (adminResponse.data?.message) {
  console.log('API message:', adminResponse.data.message);
}

      setSuccessMessage('College admin successfully added!');
      if (adminResponse.data?.coladmin) {
        setColadmins([...coladmins, adminResponse.data.coladmin]);
      }

      // Reset form
      setName('');
      setState('');
      setDistrict('');
      setCity('');
      setUniversity('');
      setPrincipalName('');
      setContactPerson('');
      setContact1('');
      setContact2('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCollegeAdminName('');
      setVisitingLocation('');
      setIsMOUSigned(true);
      setIsActive(true);

      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting college admin:', error);
      let errorMessage = 'Failed to add college admin';
      
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        
        if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.status === 404) {
          errorMessage = 'API endpoint not found. Please check the URL.';
        } else if (error.response.status === 500) {
          errorMessage = 'Server error occurred. Please try again later.';
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        errorMessage = 'No response from server. Check your network connection.';
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
        errorMessage = 'Request setup failed: ' + error.message;
      }
      
      alert(errorMessage);
    }
  };



  const handleDeleteColadmin = (name) => {
    axios.delete(`http://localhost:1010/U1/AdminColDel/${name}`)
      .then(response => {
        console.log(response.data);
        setColadmins(coladmins.filter(coladmin => coladmin.College_Name !== name));
      })
      .catch(error => {
        console.error('There was an error deleting the college admin data!', error);
      });
  };

  const handleEditColadmin = (coladmin) => {
    setEditMode(true);
    setEditColadminId(coladmin._id);
    setName(coladmin.College_Name);
    setState(coladmin.State);
    setDistrict(coladmin.District);
    setCity(coladmin.City);
    setUniversity(coladmin.University);
    setPrincipalName(coladmin.College_PrincipleName);
    setContactPerson(coladmin.College_ContactPerson);
    setContact1(coladmin.College_Contact1);
    setContact2(coladmin.College_Contact2);
    setEmail(coladmin.College_EmailId);
    setPassword(coladmin.College_Password);
    setConfirmPassword(coladmin.College_ConfirmPassword);
    setCollegeAdminName(coladmin.College_AdminName);
    setVisitingLocation(coladmin.College_VisitingLocation);
    setIsMOUSigned(coladmin.Is_MOU_Sign === 'Signed');
    setIsActive(coladmin.Status === 'Active');
  };

  const handleUpdateColadmin = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const updatedColadmin = {
      id: editColadminId,
      College_Name: name,
      State: state,
      District: district,
      City: city,
      University: university,
      College_PrincipleName: principalName,
      College_ContactPerson: contactPerson,
      College_EmailId: email,
      College_AdminName: collegeAdminName,
      College_Password: password,
      College_ConfirmPassword: confirmPassword,
      College_VisitingLocation: visitingLocation,
      Is_MOU_Sign: isMOUSigned ? 'Signed' : 'Unsigned',
      College_Contact1: contact1,
      College_Contact2: contact2,
      Status: isActive ? 'Active' : 'Inactive'
    };

    axios.put(`http://localhost:1010/U1/AdminColupdate/${updatedColadmin.College_Name}`, updatedColadmin)
      .then(response => {
        console.log(response.data);
        const updatedColadmins = coladmins.map(coladmin => {
          if (coladmin.College_Name === updatedColadmin.College_Name) {
            return {
              ...coladmin,
              College_Name: updatedColadmin.College_Name,
              State: updatedColadmin.State,
              District: updatedColadmin.District,
              City: updatedColadmin.City,
              University: updatedColadmin.University,
              College_PrincipleName: updatedColadmin.College_PrincipleName,
              College_ContactPerson: updatedColadmin.College_ContactPerson,
              College_EmailId: updatedColadmin.College_EmailId,
              College_AdminName: updatedColadmin.College_AdminName,
              College_Password: updatedColadmin.College_Password,
              College_ConfirmPassword: updatedColadmin.College_ConfirmPassword,
              College_VisitingLocation: updatedColadmin.College_VisitingLocation,
              Is_MOU_Sign: updatedColadmin.Is_MOU_Sign,
              College_Contact1: updatedColadmin.College_Contact1,
              College_Contact2: updatedColadmin.College_Contact2,
              Status: updatedColadmin.Status
            };
          }
          return coladmin;
        });
        setColadmins(updatedColadmins);
        setEditMode(false);
        setEditColadminId(null);
        setName('');
        setState('');
        setDistrict('');
        setCity('');
        setUniversity('');
        setPrincipalName('');
        setContactPerson('');
        setContact1('');
        setContact2('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCollegeAdminName('');
        setVisitingLocation('');
        setIsMOUSigned(true);
        setIsActive(true);
      })
      .catch(error => {
        console.error('There was an error editing the college admin data!', error);
      });
  };


  return (
    <>
      <Container fluid>
        <Row>
          <Col md={12}>
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4" style={{ color: "#212529ed", fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: "20px" }}>COLLEGE ADMIN</Card.Title>
                <p className="card-category" style={{ color: "blue", fontFamily: "Georgia, serif", fontSize: "13px" }}>College Admin Information</p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-3">
                <Form onSubmit={(e) => {
                  e.preventDefault();
                  handleAddColadmin(e);
                }}>
                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formName">
                        <Form.Label>College Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter College Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formUniversity">
                        <Form.Label>University</Form.Label>
                        <Form.Control
                         type="text"
                          placeholder="Enter College Name"
                          value={university}
                          onChange={(e) => setUniversity(e.target.value)}
                        >
                          {/* <option value="">Select University</option>
                          {universities.map((u) => (
                            <option key={u._id} value={u._id}>{u.University_Name}</option>
                          ))} */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={4}>
                      <Form.Group controlId="formState">
                        <Form.Label>State</Form.Label>
                        <Form.Control
                         type="text"
                          placeholder="Enter State"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          {/* <option value="">Select State</option>
                          {states.map((s) => (
                            <option key={s._id} value={s._id}>{s.State_Name}</option>
                          ))} */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formDistrict">
                        <Form.Label>District</Form.Label>
                        <Form.Control
                         type="text"
                          placeholder="Enter District"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                        >
                          {/* <option value="">Select District</option>
                          {districts.map((d) => (
                            <option key={d._id} value={d._id}>{d.District_Name}</option>
                          ))} */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                         type="text"
                          placeholder="Enter City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        >
                          {/* <option value="">Select City</option>
                          {cities.map((c) => (
                            <option key={c._id} value={c._id}>{c.City_Name}</option>
                          ))} */}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formPrincipal">
                        <Form.Label>Principal Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Principal Name"
                          value={principalName}
                          onChange={(e) => setPrincipalName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formContPrson">
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Contact Person Name"
                          value={contactPerson}
                          onChange={(e) => setContactPerson(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formContact1">
                        <Form.Label>Contact No 1</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter Contact No 1"
                          value={contact1}
                          onChange={(e) => setContact1(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formContact2">
                        <Form.Label>Contact No 2</Form.Label>
                        <Form.Control
                          type="tel"
                          placeholder="Enter Contact No 2"
                          value={contact2}
                          onChange={(e) => setContact2(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formCollegeAdminName">
                        <Form.Label>College Admin Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter College Admin Name"
                          value={collegeAdminName}
                          onChange={(e) => setCollegeAdminName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formConPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group controlId="formVisLoc">
                        <Form.Label>Visiting Location</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Visiting Location"
                          value={visitingLocation}
                          onChange={(e) => setVisitingLocation(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-center mt-4">
                      <Form.Group style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                        {/* MOU Signed Checkbox */}
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Form.Label style={{ marginBottom: "5px", color: "black" }}>Is MOU signed (Y/N):</Form.Label>
                          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            Check the box if signed
                            <input type="checkbox" checked={isMOUSigned} onChange={() => setIsMOUSigned(!isMOUSigned)} />
                          </label>
                        </div>

                        {/* Status Checkbox */}
                        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                          <Form.Label style={{ marginBottom: "5px", color: "black" }}>Status:</Form.Label>
                          <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                            Active / Inactive:
                            <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                          </label>
                        </div>
                      </Form.Group>

                    </Col>
                  </Row>

                  <div className="d-flex justify-content-start">
                    {editMode ? (
                      <button variant="success" type="submit" className="btn btn-primary" onClick={handleUpdateColadmin} style={{
                        border: "2px solid ",
                        fontWeight: "bold",
                       
                      }}>
                        Update
                      </button>
                    ) : (
                      <button variant="success" type="submit" className="btn btn-primary" style={{
                        border: "2px solid ",
                        fontWeight: "bold",
                      }}>
                        Add College Admin
                      </button>
                    )}
                  </div>


                  {successMessage && (
                    <p className="text-success mt-3">{successMessage}</p>
                  )}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

    </>
  );
}

export default CollegeAdmin;

