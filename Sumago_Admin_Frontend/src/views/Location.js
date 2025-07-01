import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Location = () => {
    const [locationName, setLocationName] = useState('');
    const [locationCity, setLocationCity] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [locations, setLocations] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editLocationId, setEditLocationId] = useState(null);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = () => {
        axios.get('http://localhost:1010/U1/AdminLocReg')
            .then(response => {
                setLocations(response.data.location);
            })
            .catch(error => {
                console.error('There was an error fetching the location data!', error);
            });
    };

    const handleAddLocation = (e) => {
        e.preventDefault();

        if (!locationCity || !locationName) {
            alert('Please fill out all fields');
            return;
        }

        const newLocation = {
            Location_Name: locationName,
            Location_City: locationCity,
            Status: isActive ? 'Active' : 'Inactive'
        };

        axios.post('http://localhost:1010/U1/AdminLocpost', newLocation)
            .then(response => {
                if (response.data && response.data.state) {
                    setLocations([...locations, response.data.state]);
                } else {
                    console.error('Invalid response structure:', response.data);
                }
                setLocationCity('');
                setLocationName('');
                setIsActive(true);
            })
            .catch(error => {
                console.error('There was an error adding the location!', error);
            });
    };

    const handleDeleteLocation = (locationName) => {
        const confirmed = window.confirm(`Are you sure you want to delete the location ${locationName}?`);
        if (confirmed) {
            axios.delete(`http://localhost:1010/U1/AdminLocDel/${locationName}`)
                .then(response => {
                    console.log(response.data);
                    setLocations(locations.filter(location => location.Location_Name !== locationName));
                })
                .catch(error => {
                    console.error('There was an error deleting the location!', error);
                });
        }
    };

    const handleEditLocation = (location) => {
        setEditMode(true);
        setEditLocationId(location.Location_Name); 
        setLocationName(location.Location_Name);
        setLocationCity(location.Location_City);
        setIsActive(location.Status === 'Active');
    };

    const handleUpdateLocation = () => {
        const confirmed = window.confirm(`Are you sure you want to update this location?`);
        if (confirmed) {
            const updatedLocation = {
                newLocationName: locationName,
                Location_City: locationCity,
                Status: isActive ? 'Active' : 'Inactive'
            };

            axios.put(`http://localhost:1010/U1/AdminLocupdate/${editLocationId}`, updatedLocation)
                .then(response => {
                    console.log('Update response:', response.data);
                    const updatedLocations = locations.map(location => {
                        if (location.Location_Name === editLocationId) {
                            return {
                                ...location,
                                Location_Name: updatedLocation.newLocationName,
                                Location_City: updatedLocation.Location_City,
                                Status: updatedLocation.Status
                            };
                        }
                        return location;
                    });
                    setLocations(updatedLocations);
                    setEditMode(false);
                    setEditLocationId(null);
                    setLocationName('');
                    setLocationCity('');
                    setIsActive(true);
                })
                .catch(error => {
                    console.error('Error updating location:', error);
                });
        }
    };

    return (
        <Container fluid>
    <Row>
        <Col md="12">
            <Card className="strpied-tabled-with-hover">
                <Card.Header>
                    <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>LOCATION</Card.Title>
                    <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>Location Information</p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                        <thead>
                            <tr>
                                <th className="border-0">Location</th>
                                <th className="border-0">Location City</th>
                                <th className="border-0">Status</th>
                                <th className="border-0">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                        type="text"
                                        value={locationName}
                                        onChange={(e) => setLocationName(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={locationCity}
                                        onChange={(e) => setLocationCity(e.target.value)}
                                    />
                                </td>
                                <td>
                                    <label>
                                        Active / Inactive:
                                        <input
                                            type="checkbox"
                                            style={{ width: "13px", height: "13px", marginLeft: "3px", color: "blue" }}
                                            checked={isActive}
                                            onChange={() => setIsActive(!isActive)}
                                        />
                                    </label>
                                </td>
                                <td>
                                    {editMode ? (
                                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleUpdateLocation}>
                                            Update
                                        </Button>
                                    ) : (
                                        <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleAddLocation}>
                                            Add Location
                                        </Button>
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
                    <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>LOCATION</Card.Title>
                    <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>User Location</p>
                </Card.Header>
                <Card.Body className="table-full-width table-responsive px-0">
                    <Table className="table-hover table-striped">
                        <thead>
                            <tr>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Sr NO.</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Location</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Location City</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Status</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {locations.map((location, index) => (
                                <tr key={index}>
                                    <td className="text-center align-middle">{index + 1}</td>
                                    <td className="text-center align-middle" style={{ color: "#909090" }}>{location.Location_Name}</td>
                                    <td className="text-center align-middle" style={{ color: "#909090" }}>{location.Location_City}</td>
                                    <td className="text-center align-middle" style={{ color: "#909090" }}>{location.Status}</td>
                                    <td className="d-flex justify-content-center align-items-center gap-3" style={{ height: "63px" }}>
                                        <MdEdit
                                            onClick={() => handleEditLocation(location)}
                                            style={{ cursor: 'pointer', color: 'blue' }}
                                        />
                                        <MdDelete
                                            onClick={() => handleDeleteLocation(location.Location_Name)}
                                            style={{ cursor: 'pointer', color: 'red', marginLeft:"10px" }}
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

export default Location;
