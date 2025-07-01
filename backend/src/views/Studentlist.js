import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Card, Table, Alert, Spinner } from 'react-bootstrap';
import { MdDelete, MdEdit } from 'react-icons/md';

const StudentForm = () => {
    const [students, setStudents] = useState([]);
    const [student, setStudent] = useState({
        Student_Name: '',
        Student_Acadmic_Year: '',
        Level_of_Education: '',
        Student_of_Department: '',
        Contact_Number: '',
        EmailId: '',
        College_Name: ''
    });
    const [editing, setEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [visits, setVisits] = useState([]);
    const [selectedCollegeId, setSelectedCollegeId] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetchVisits();
        fetchStudents();
    }, []);

    const fetchVisits = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:1010/U1/ColvisitReg');
            setVisits(response.data.requestvisits);
        } catch (error) {
            setError("Error fetching college visits");
            console.error("Error fetching visits:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStudents = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:1010/U1/StudReg?populate=College_Name');
            setStudents(response.data.stude);
        } catch (error) {
            setError("Error fetching students");
            console.error("Error fetching students:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCollegeName = (collegeData) => {
        if (!collegeData) return "Unknown College";
        if (typeof collegeData === 'object' && collegeData.College_Name) {
            return collegeData.College_Name;
        }
        if (typeof collegeData === 'string') {
            const college = visits.find(v => v._id === collegeData);
            return college ? college.College_Name : "Unknown College";
        }
        return "Unknown College";
    };

    const groupedStudentsByCollege = students.reduce((acc, student) => {
        const collegeName = getCollegeName(student.College_Name);
        if (!acc[collegeName]) {
            acc[collegeName] = [];
        }
        acc[collegeName].push(student);
        return acc;
    }, {});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const studentData = {
            ...student,
            College_Name: selectedCollegeId || null
        };

        try {
            setLoading(true);
            if (editing) {
                if (window.confirm('Are you sure you want to update this student?')) {
                    await axios.put(`http://localhost:1010/U1/Studupdate/${currentId}`, studentData);
                    setSuccess('Student updated successfully');
                    fetchStudents();
                    resetForm();
                }
            } else {
                await axios.post('http://localhost:1010/U1/Studpost', studentData);
                setSuccess('Student added successfully');
                fetchStudents();
                resetForm();
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Operation failed');
            console.error("Error saving student:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (stude) => {
        const collegeName = getCollegeName(stude.College_Name);
        const collegeId = typeof stude.College_Name === 'object'
            ? stude.College_Name._id
            : stude.College_Name;

        setStudent({
            Student_Name: stude.Student_Name,
            Student_Acadmic_Year: stude.Student_Acadmic_Year,
            Level_of_Education: stude.Level_of_Education,
            Student_of_Department: stude.Student_of_Department,
            Contact_Number: stude.Contact_Number,
            EmailId: stude.EmailId,
            College_Name: collegeName
        });
        setEditing(true);
        setCurrentId(stude._id);
        setSelectedCollegeId(collegeId);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                setLoading(true);
                setError(null);
                await axios.delete(`http://localhost:1010/U1/StudDel/${id}`);
                setSuccess('Student deleted successfully');
                fetchStudents();
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to delete student');
                console.error("Error deleting student:", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const resetForm = () => {
        setStudent({
            Student_Name: '',
            Student_Acadmic_Year: '',
            Level_of_Education: '',
            Student_of_Department: '',
            Contact_Number: '',
            EmailId: '',
            College_Name: ''
        });
        setEditing(false);
        setCurrentId(null);
        setSelectedCollegeId('');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Georgia, serif', maxWidth: '1200px', margin: '0 auto' }}>
            {loading && <Spinner animation="border" variant="primary" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Card>
                <Card.Header>
                    <Card.Title as="h4" style={{ color: '#212529ed', fontWeight: 'bold', fontSize: '20px' }}>
                        STUDENT MANAGEMENT
                    </Card.Title>
                    <p style={{ color: 'blue', fontSize: '13px' }}>Student's Information</p>
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {Object.keys(student).map((key) => (
                            key !== 'College_Name' && (
                                <Form.Group key={key} controlId={`form${key}`}>
                                    <Form.Label style={{ color: "black" }}>{key.replace(/_/g, ' ')}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={key}
                                        placeholder={`Enter ${key.replace(/_/g, ' ')}`}
                                        value={student[key]}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            )
                        ))}
                        <Form.Group controlId="formCollege">
                            <Form.Label style={{ color: "black" }}>College Name</Form.Label>
                            <Form.Control
                                as="select"
                                value={selectedCollegeId}
                                onChange={(e) => {
                                    const selectedId = e.target.value;
                                    const selectedCollege = visits.find(v => v._id === selectedId);
                                    setSelectedCollegeId(selectedId);
                                    setStudent(prev => ({
                                        ...prev,
                                        College_Name: selectedCollege?.College_Name || ''
                                    }));
                                }}
                                required
                            >
                                <option value="">Select College</option>
                                {visits.map((visit) => (
                                    <option key={visit._id} value={visit._id}>
                                        {visit.College_Name}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" style={{ width: '160px' }} disabled={loading}>
                            {loading ? 'Processing...' : editing ? 'Update Student' : 'Add Student'}
                        </Button>
                        {editing && (
                            <Button variant="secondary" onClick={resetForm} style={{ width: '160px' }}>
                                Cancel
                            </Button>
                        )}
                    </Form>
                </Card.Body>
            </Card>

            {Object.entries(groupedStudentsByCollege).map(([collegeName, studentsList]) => (
                <Card key={collegeName} style={{ margin: '20px 0' }}>
                    <Card.Body>
                        <h5 style={{ color: "blue", fontWeight: "bold", marginBottom: '15px' }}>
                            College Name: {collegeName}
                        </h5>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Name</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Academic Year</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Level of Education</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Department</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Contact Number</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Email ID</td>
                                    <td style={{fontFamily: "Georgia, serif", fontWeight:"bold"}} className="text-center align-middle">Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {studentsList.map((stude) => (
                                    <tr key={stude._id}>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.Student_Name}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.Student_Acadmic_Year}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.Level_of_Education}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.Student_of_Department}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.Contact_Number}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">{stude.EmailId}</td>
                                        <td style={{fontSize:"14px"}} className="text-center align-middle">
                                            <MdDelete
                                                onClick={() => handleDelete(stude._id)}
                                                style={{ cursor: 'pointer', color: 'red' }}
                                                title="Delete"
                                            />
                                            <MdEdit
                                                onClick={() => handleEdit(stude)}
                                                style={{ cursor: 'pointer', color: 'blue', marginLeft: '10px' }}
                                                title="Edit"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default StudentForm;