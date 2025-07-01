import React, { useState, useEffect } from "react";
import { Button, Card, Table, Container, Row, Col } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";
import axios from "axios";

const Collegeuniversity = () => {
    const [universityName, setUniversityName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [universitys, setUniversitys] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editUniversityId, setEditUniversityId] = useState(null);

    useEffect(() => {
        fetchUniversitys();
    }, []);

    const fetchUniversitys = () => {
        axios.get('http://localhost:1010/U1/uniReg')
            .then(response => {
                setUniversitys(response.data.collegeuniversity);
            })
            .catch(error => {
                console.error('There was an error fetching the university data!', error);
            });
    };

    const handleAddUniversity = (e) => {
        e.preventDefault();

        if (!universityName) {
            alert('Please fill out the university name');
            return;
        }

        const newUniversity = {
            University_Name: universityName,
            Status: isActive ? 'Active' : 'Inactive'
        };

        axios.post('http://localhost:1010/U1/unipost', newUniversity)
            .then(response => {
                if (response.data && response.data.universe) {
                    setUniversitys([...universitys, response.data.universe]);
                } else {
                    console.error('Invalid response structure:', response.data);
                }
                setUniversityName('');
                setIsActive(true);
            })
            .catch(error => {
                console.error('There was an error adding the university!', error);
            });
    };

    const handleDeleteUniversity = (universityName) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete the university ${universityName}?`);
        if (!confirmDelete) return;

        axios.delete(`http://localhost:1010/U1/UniDel/${universityName}`)
            .then(response => {
                console.log(response.data);
                setUniversitys(universitys.filter(collegeuniversity => collegeuniversity.University_Name !== universityName));
            })
            .catch(error => {
                console.error('There was an error deleting the University!', error);
            });
    };

    const handleEditUniversity = (collegeuniversity) => {
        setEditMode(true);
        setEditUniversityId(collegeuniversity.University_Name);
        setUniversityName(collegeuniversity.University_Name);
        setIsActive(collegeuniversity.Status === 'Active');
    };

    const handleUpdateUniversity = () => {
        const confirmUpdate = window.confirm('Are you sure you want to update this university?');
        if (!confirmUpdate) return;

        const updatedUniversity = {
            newUniversityName: universityName,
            Status: isActive ? 'Active' : 'Inactive'
        };

        axios.put(`http://localhost:1010/U1/uniupdate/${editUniversityId}`, updatedUniversity)
            .then(response => {
                console.log(response.data);
                const updatedUniversitys = universitys.map(collegeuniversity => {
                    if (collegeuniversity.University_Name === editUniversityId) {
                        return {
                            ...collegeuniversity,
                            University_Name: updatedUniversity.newUniversityName,
                            Status: updatedUniversity.Status
                        };
                    }
                    return collegeuniversity;
                });
                setUniversitys(updatedUniversitys);
                setEditMode(false);
                setEditUniversityId(null);
                setUniversityName('');
                setIsActive(true);
            })
            .catch(error => {
                console.error('There was an error editing the university!', error);
            });
    };


    return (
        <Container fluid>
            <Row>
                <Col md="12">
                    <Card className="strpied-tabled-with-hover">
                        <Card.Header>
                            <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>UNIVERSITY</Card.Title>
                            <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>University Information</p>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>University</th>
                                        <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>Status</th>
                                        <th className="border-0" style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color:"black"}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><input type="text" value={universityName} onChange={(e) => setUniversityName(e.target.value)} /></td>
                                        <td>
                                            <label>Active / Inactive</label>
                                            <input type="checkbox" checked={isActive} onChange={() => setIsActive(!isActive)} />
                                        </td>
                                        <td>
                                            {editMode ? (
                                                <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleUpdateUniversity}>Update</Button>
                                            ) : (
                                                <Button variant="secondary" style={{ backgroundColor: "#212529", color: "white", border: "none" }} onClick={handleAddUniversity}>Add University</Button>
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
                            <Card.Title as="h4" style={{ color: 'rgb(33, 37, 41)', fontWeight: "bold" }}>UNIVERSITY</Card.Title>
                            <p className="card-category" style={{ color: 'blue', fontSize: '13px' }}>College University</p>
                        </Card.Header>
                        <Card.Body className="table-full-width table-responsive px-0">
                            <Table className="table-hover table-striped">
                                <thead>
                                    <tr>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>SR NO.</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>University </td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Status</td>
                                        <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold", color: "black", textAlign: "center" }}>Action</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {universitys.map((collegeuniversity, index) => (
                                        <tr key={collegeuniversity._id}>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{index + 1}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{collegeuniversity.University_Name}</td>
                                            <td className="text-center align-middle" style={{ color: "#909090" }}>{collegeuniversity.Status}</td>
                    
                                            <td className="d-flex justify-content-center align-items-center gap-3" style={{height:"50px"}}>
                                                <MdDelete
                                                    onClick={() => handleDeleteUniversity(collegeuniversity.University_Name)}
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                />
                                                <MdEdit
                                                    onClick={() => handleEditUniversity(collegeuniversity)}
                                                    style={{ cursor: 'pointer', color: 'blue' }}
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

export default Collegeuniversity;
