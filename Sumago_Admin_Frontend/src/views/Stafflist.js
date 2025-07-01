import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdDelete, MdEdit } from 'react-icons/md';
import 'bootstrap/dist/css/bootstrap.min.css';

const StaffList = () => {
    const [staff, setStaff] = useState([]);
    const [formData, setFormData] = useState({
        Department_Name: '',
        Post_Name: '',
        Faculty_Name: '',
        Contact_Number: '',
        College_Name: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [staffList, setstaffList] = useState([]);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost:1010/U1/staff');
            setStaff(response.data.data);
            setstaffList(response.data.data);
        } catch (error) {
            console.error('Error fetching staff data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:1010/U1/staff/${editingId}`, formData);
                setSuccessMessage("Staff updated successfully!");
            } else {
                await axios.post('http://localhost:1010/U1/staff', formData);
                setSuccessMessage("Staff added successfully!");
            }

            setTimeout(() => setSuccessMessage(''), 3000);
            fetchStaff();
            resetForm();
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    const resetForm = () => {
        setFormData({
            Department_Name: '',
            Post_Name: '',
            Faculty_Name: '',
            Contact_Number: '',
            College_Name: ''
        });
        setEditingId(null);
    };

    const handleEdit = (staffMember) => {
        if (window.confirm('Are you sure you want to update this staff information?')) {
            setFormData({
                ...staffMember,
                College: staffMember.College?.College_Name || ''
            });
            setEditingId(staffMember._id);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this staff information?')) {
            try {
                await axios.delete(`http://localhost:1010/U1/staff/${id}`);
                fetchStaff();
            } catch (error) {
                console.error("Error deleting staff:", error);
            }
        }
    };

    return (
        <div className="container" style={{ fontFamily: "Georgia, serif" }}>
            {/* Form Section */}
            <div className="form-card">
                {successMessage && <div className="alert alert-success">{successMessage}</div>}
                <h3 style={{ color: "#212529ed", fontFamily: "Georgia, serif", fontWeight: "bold", fontSize: "20px" }}>
                    {editingId ? "Edit Staff" : "ADD STAFF"}
                </h3>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>Department Name</label>
                            <input
                                type="text"
                                name="Department_Name"
                                placeholder="Enter Department Name"
                                value={formData.Department_Name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Post Name</label>
                            <input
                                type="text"
                                name="Post_Name"
                                placeholder="Enter Post Name"
                                value={formData.Post_Name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>Faculty Name</label>
                            <input
                                type="text"
                                name="Faculty_Name"
                                placeholder="Enter Faculty Name"
                                value={formData.Faculty_Name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="Contact_Number"
                                placeholder="Enter Contact Number"
                                value={formData.Contact_Number}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>College Name </label>
                            <input
                                type="text"
                                name="College_Name"
                                placeholder="Enter College Name "
                                value={formData.College_Name}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="btn-group">
                        <button type="submit" className="btn btn-primary" style={{ marginTop: "15px", width: "150px" }}>
                            {editingId ? "Update Staff" : "Add Staff"}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn-primary" onClick={resetForm} style={{ marginTop: "15px", width: "150px", marginLeft: "20px" }}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Staff List Table Section */}
            <div className="mt-5">
                <h3 style={{ color: "#212529ed", fontWeight: "bold", fontFamily: "Georgia, serif", fontSize: "20px" }}>STAFF LIST</h3>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="thead-dark text-center">
                            <tr>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Sr No.</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Department</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Post</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Faculty</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Contact</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>College</td>
                                <td style={{ fontFamily: "Georgia, serif", fontWeight: "bold" }}>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.length > 0 ? (
                                staffList.map((staff, index) => (
                                    <tr key={staff._id}>
                                        <td className="text-center align-middle">{index + 1}</td>
                                        <td className="text-center align-middle">{staff.Department_Name}</td>
                                        <td className="text-center align-middle">{staff.Post_Name}</td>
                                        <td className="text-center align-middle">{staff.Faculty_Name}</td>
                                        <td className="text-center align-middle">{staff.Contact_Number}</td>
                                        <td className="text-center align-middle">{staff.College_Name}</td>
                                        <td className="d-flex justify-content-center align-items-center gap-3">
                                            <MdDelete
                                                onClick={() => handleDelete(staff._id)}
                                                style={{ cursor: 'pointer', color: 'red' }}
                                            />
                                            <MdEdit
                                                onClick={() => handleEdit(staff)}
                                                style={{ cursor: 'pointer', color: 'blue' }}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">No staff records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StaffList;
