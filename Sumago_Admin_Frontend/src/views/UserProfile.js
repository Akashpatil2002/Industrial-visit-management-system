import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form, Image, Row, Col } from 'react-bootstrap';
// import '../assets/css/userprofile.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    company: 'Sumago Infotech Pvt. Ltd.', // Default value
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    aboutMe: '',
    profileImage: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:1010/U1/profile')
      .then(({ data }) => {
        if (data) {
          setProfile(data);
          setFormData({
            company: data.company ?? 'Sumago Infotech Pvt. Ltd.', 
            username: data.username ?? '',
            email: data.email ?? '',
            firstName: data.firstName ?? '',
            lastName: data.lastName ?? '',
            address: data.address ?? '',
            city: data.city ?? '',
            country: data.country ?? '',
            postalCode: data.postalCode ?? '',
            aboutMe: data.aboutMe ?? '',
            profileImage: data.profileImage ?? null,
          });
          setIsEditing(true);
        }
      })
      .catch(error => console.error('Error fetching profile data:', error));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, value);
    });

    const apiCall = isEditing
      ? axios.put('http://localhost:1010/U1/admin/update', form)
      : axios.post('http://localhost:1010/U1/register', form);

    apiCall
      .then(({ data }) => {
        setProfile(data);
        alert(isEditing ? 'Profile updated successfully' : 'Profile created successfully');
        setIsEditing(true);
      })
      .catch(error => console.error(`Error ${isEditing ? 'updating' : 'creating'} profile:`, error));
  };

  return (
    <>
<Container fluid style={{ fontFamily: "Georgia, serif" }} >
  <Row>
    {/* Left Section - Form */}
    <Col xs={12} lg={8}>
      <Card>
        <Card.Header>
          <Card.Title as="h4"  style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>{isEditing ? 'EDIT PROFILE ' : 'CREATE PROFILE'}</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} md={5}>
                <Form.Group>
                  <Form.Label>Company (disabled)</Form.Label>
                  <Form.Control
                    defaultValue="Sumago Infotech Pvt.Ltd"
                    disabled
                    placeholder="Company"
                    type="text"
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={4}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} md={4}>
                <Form.Group controlId="formPostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group controlId="formAboutMe">
                  <Form.Label>About Me</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="aboutMe"
                    value={formData.aboutMe}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="formProfileImage">
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="profileImage"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="submit" className="mt-3">
              {isEditing ? 'Update Profile' : 'Create Profile'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Col>

    {/* Right Section - Profile Summary */ }
    
    <Col xs={12} lg={4} className="mt-4 mt-lg-0" >
      <Card className="card-user">
        <div className="card-image">{/* Background image if needed */}</div>
        <Card.Body>
          <div className="author text-center">
            {profile && (
              <Image
                src={profile.profileImage ? `http://localhost:1010/${profile.profileImage}` : '/images/default.png'}
                roundedCircle
                width={120}
                height={120}
              />
            )}
            <h5 className="title mt-2">
              {profile?.firstName} {profile?.lastName}
            </h5>
            <h1 className="description" style={{ fontFamily: "Georgia, serif" ,fontWeight:"bold" , fontSize:"30px"  }} >Admin</h1>
            <h1 className="description">{profile?.username}</h1>
          </div>
          <p className="description text-center" style={{ fontFamily: "Georgia, serif", color:"red" , fontSize:"15px"}}>
            SCOPE <br />
            Sumago Infotech <br />
            Nashik
          </p>
        </Card.Body>
        <hr />
        <div className="button-container d-flex justify-content-center">
          <Button className="btn-simple btn-icon" href="https://www.facebook.com/sumagoinfotech/" variant="link">
            <i className="fab fa-facebook-square" />
          </Button>
          <Button className="btn-simple btn-icon" href="https://twitter.com/SumagoInfotech" variant="link">
            <i className="fab fa-twitter" />
          </Button>
          <Button className="btn-simple btn-icon" href="https://www.instagram.com/sumagoinfotech/" variant="link">
            <i className="fab fa-instagram" />
          </Button>
        </div>
      </Card>
    </Col>
  </Row>
</Container>

    </>
  );
}

export default UserProfile;
