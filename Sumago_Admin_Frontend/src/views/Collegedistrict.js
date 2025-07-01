import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Collegedistrict = () => {
  const [districtName, setDistrictName] = useState('');
  const [districtState, setDistrictState] = useState('');
  const [states, setStates] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [districts, setDistricts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editDistrictId, setEditDistrictId] = useState(null);
  const [currentDistrictName, setCurrentDistrictName] = useState('');

  useEffect(() => {
    fetchDistricts();
    fetchStates();
  }, []);

  const fetchDistricts = () => {
    axios.get('http://localhost:1010/U1/disReg')
      .then(response => {
        setDistricts(response.data.district);
      })
      .catch(error => {
        console.error('There was an error fetching the district data!', error);
      });
  };

  const fetchStates = () => {
    axios.get('http://localhost:1010/U1/StateActiveReg')
      .then(response => {
        setStates(response.data.state);
      })
      .catch(error => {
        console.error('There was an error fetching the state data!', error);
      });
  };

  const handleAddDistrict = (e) => {
    e.preventDefault();

    if (!districtName || !districtState) {
      alert('Please fill out all fields');
      return;
    }

    const newDistrict = {
      District_Name: districtName,
      State: districtState,
      Status: isActive ? 'Active' : 'Inactive',
    };

    axios.post('http://localhost:1010/U1/dispost', newDistrict)
      .then(response => {
        if (response.data && response.data.district) {
          setDistricts(prevDistricts => [...prevDistricts, response.data.district]);
        } else {
          console.error('Invalid response structure:', response.data);
        }
        fetchDistricts();
        setDistrictName('');
        setDistrictState('');
        setIsActive(true);
      })
      .catch(error => {
        console.error('There was an error adding the district!', error);
      });
  };

  const handleDeleteDistrict = (districtName) => {
    if (window.confirm(`Are you sure you want to delete the district?`)) {
      axios.delete(`http://localhost:1010/U1/disDel/${districtName}`)
        .then(response => {
          console.log(response.data);
          setDistricts(districts.filter(district => district.District_Name !== districtName));
        })
        .catch(error => {
          console.error('There was an error deleting the District!', error);
        });
    }
  };

  const handleEditDistrict = (district) => {
    if (window.confirm(`Do you want to edit this district?`)) {
      setEditMode(true);
      setEditDistrictId(district._id); // Set the ID for the district being edited
      setDistrictName(district.District_Name);
      setDistrictState(district.State._id);
      setIsActive(district.Status === 'Active');
      setCurrentDistrictName(district.District_Name);
    }
  };

  const handleUpdateDistrict = () => {
    const updatedDistrict = {
      newDistrictName: districtName,
      State: districtState,
      Status: isActive ? 'Active' : 'Inactive',
    };

    axios.put(`http://localhost:1010/U1/disupdate/${currentDistrictName}`, updatedDistrict)
      .then(response => {
        const updatedData = response.data;

        setDistricts(prevDistricts =>
          prevDistricts.map(district =>
            district.District_Name === currentDistrictName ? updatedData : district
          )
        );

        setEditMode(false);
        setDistrictName('');
        setDistrictState('');
        setIsActive(true);
        setCurrentDistrictName('');
      })
      .catch(error => {
        console.error('There was an error updating the district!', error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>DISTRICT</Card.Title>
              <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>District Information</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black" }}>District </th>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black" }}>State</th>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black" }}>Status</th>
                    <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>

                      <input
                        type="text"
                        value={districtState}
                        onChange={(e) => setDistrictState(e.target.value)}
                      />

                    </td>
                    <td><input type="text" value={districtName} onChange={(e) => setDistrictName(e.target.value)} /></td>
                    <td><label>Active / Inactive: <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} /></label></td>
                    <td>
                      {editMode ? (
                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleUpdateDistrict}>Update</Button>
                      ) : (
                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleAddDistrict}>Add District</Button>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md="12">
          <Card className="strpied-tabled-with-hover">
            <Card.Header>
              <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>DISTRICT</Card.Title>
              <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>User District</p>
            </Card.Header>
            <Card.Body className="table-full-width table-responsive px-0">
              <Table className="table-hover table-striped">
                <thead>
                  <tr>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Sr NO.</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>District</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }} >State</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Status</td>
                    <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {districts.map((district, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{index + 1}</td>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{district.District_Name}</td>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{district.State || 'N/A'}</td>
                      <td className="text-center align-middle" style={{ color: "#909090" }}>{district.Status}</td>
                      <td className="d-flex justify-content-center align-items-center gap-3" style={{ height: "50px" }}>
                        <MdEdit
                          onClick={() => handleEditDistrict(district)}
                          style={{ cursor: 'pointer', color: 'blue' }}
                        />
                        <MdDelete
                          onClick={() => handleDeleteDistrict(district.District_Name)}
                          style={{ cursor: 'pointer', color: 'red' }}
                        />

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

export default Collegedistrict;
