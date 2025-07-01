import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Collegecity = () => {
    const [City_Name, setCityName] = useState('');
    const [cityState, setCityState] = useState('');
    const [cityDistrict, setCityDistrict] = useState('');
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [isActive, setIsActive] = useState(true);
    const [citys, setCitys] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editCityId, setEditCityId] = useState(null);

    useEffect(() => {
        fetchCitys();
    }, []);

    const fetchCitys = () => {
        axios.get('http://localhost:1010/U1/CityReg')
            .then(response => {
                setCitys(response.data.city);
            })
            .catch(error => {
                console.error('There was an error fetching the city data!', error);
            });

        axios.get('http://localhost:1010/U1/StateActiveReg')
            .then(response => {
                setStates(response.data.state);
            })
            .catch(error => {
                console.error('There was an error fetching the state data!', error);
            });

        axios.get('http://localhost:1010/U1/disReg')
            .then(response => {
                setDistricts(response.data.district);
            })
            .catch(error => {
                console.error('There was an error fetching the district data!', error);
            });
    };

    const handleAddCity = () => {
        const newCity = {
            City_Name: City_Name,
            State: cityState,
            District: cityDistrict,
            Status: isActive ? 'Active' : 'Inactive',
        };

        axios.post('http://localhost:1010/U1/Citypost', newCity)
            .then(response => {
                setCitys([...citys, response.data.city]);
                setCityName('');  // Clear input fields
                setCityState('');
                setCityDistrict('');
                setIsActive(true);
                fetchCitys(); // Fetch updated city, state, and district data
            })
            .catch(error => {
                console.error('There was an error adding the city!', error);
            });
    };





    const handleDeleteCity = (City_Name) => {
        if (window.confirm(`Are you sure you want to delete the city ${City_Name}?`)) {
            axios.delete(`http://localhost:1010/U1/CityDel/${City_Name}`)
                .then(response => {
                    setCitys(citys.filter(city => city.City_Name !== City_Name));
                    fetchCitys(); // Refresh data after deletion
                })
                .catch(error => {
                    console.error('There was an error deleting the city!', error);
                });
        }
    };

    const handleEditCity = (city) => {
        if (isConfirmed) {
            setEditMode(true);
            setEditCityId(city._id);
            setCityName(city.City_Name);
            // Check if StateId and DistrictId are available before accessing their properties
            setCityState(city.State ? city.State : ''); // Set to empty string if null
            setCityDistrict(city.District ? city.District : ''); // Set to empty string if null
            setIsActive(city.Status === 'Active');
        }
    };



    const handleUpdateCity = () => {
        if (window.confirm(`Are you sure you want to update this city?`)) {
            const updatedCity = {
                City_Name: City_Name,
                State: cityState,
                District: cityDistrict,
                Status: isActive ? 'Active' : 'Inactive',
            };

            axios.put(`http://localhost:1010/U1/Cityupdate/${editCityId}`, updatedCity)
                .then(response => {
                    setCitys(citys.map(city => city._id === editCityId ? response.data : city));
                    setEditMode(false); // Exit edit mode
                    setCityName('');
                    setCityState('');
                    setCityDistrict('');
                    setIsActive(true);
                    fetchCitys(); // Fetch updated city, state, and district data
                })
                .catch(error => {
                    console.error('There was an error updating the city!', error);
                });
        }
    };


    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>CITY</Card.Title>
                            <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>City Information</p>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="border-0">State</th>
                                        <th className="border-0">District</th>
                                        <th className="border-0">City</th>
                                        <th className="border-0">Status</th>
                                        <th className="border-0">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                            <input
                                                type="text"
                                                value={cityState}
                                                onChange={(e) => setCityState(e.target.value)}
                                            />

                                        </td>
                                        <td>

                                            <input
                                                type="text"
                                                value={cityDistrict}
                                                onChange={(e) => setCityDistrict(e.target.value)}
                                            />


                                        </td>

                                        <td><input type="text" value={City_Name} onChange={(e) => setCityName(e.target.value)} /></td>
                                        <td><label>Active / Inactive: <input type="checkbox" style={{ width: "13px", height: "13px", marginLeft: "3px", color: "blue" }} checked={isActive} onChange={() => setIsActive(!isActive)} /></label></td>
                                        <td>
                                            {editMode ? (
                                                <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleUpdateCity}>Update</Button>
                                            ) : (
                                                <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleAddCity}>Add City</Button>
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
                            <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>CITY</Card.Title>
                            <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>User City</p>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Sr NO.</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>City</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>State</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>District</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Status</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {citys.map((city, index) => (
                                        <tr key={index}>
                                            <td className="text-center align-middle">{index + 1}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{city.City_Name}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{city.State || 'N/A'}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{city.District || 'N/A'}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{city.Status}</td>
                                            <td className="d-flex justify-content-center align-items-center gap-3" style={{ height: "63px" }}>
                                                <MdEdit
                                                    onClick={() => handleEditCity(city)}
                                                    style={{ cursor: 'pointer', color: 'blue' }}
                                                />
                                                <MdDelete
                                                    onClick={() => handleDeleteCity(city.City_Name)}
                                                    style={{ cursor: 'pointer', color: 'red', marginLeft:"20px" }}
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

export default Collegecity;
