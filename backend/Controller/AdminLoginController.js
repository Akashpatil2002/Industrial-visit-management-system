const AdminLogin = require('../Models/AdminLoginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = 'mysecretkey';

// Add a new admin
const addAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingAdmin = await AdminLogin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).send({ msg: "Email already exists. Try logging in." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = new AdminLogin({ name, email, password: hashedPassword });
        const adminData = await data.save();
        res.status(200).send({ adminData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Get all admins
const getAdmin = async (req, res) => {
    try {
        const data = await AdminLogin.find();
        res.status(200).send({ data });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Find admin by email
const findAdmin = async (req, res) => {
    try {
        const admin = await AdminLogin.findOne({ email: req.body.email });
        res.status(200).send({ admin });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete admin by email
const deleteAdmin = async (req, res) => {
    try {
        const result = await AdminLogin.deleteOne({ email: req.params.email });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update admin status by email
const updateAdmin = async (req, res) => {
    try {
        const update = await AdminLogin.updateOne(
            { email: req.params.email },
            { $set: { Status: req.body.Status } }
        );
        res.status(200).send(update);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Admin login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await AdminLogin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ msg: "Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, secret, { expiresIn: '1h' });
        res.status(200).send({ msg: "Login successful", token });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Request password reset
const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;
    try {
        const admin = await AdminLogin.findOne({ email });
        if (!admin) {
            return res.status(404).send({ msg: "Admin not found" });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, secret, { expiresIn: '1h' });

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'pranavsonawane489@gmail.com',
                pass: 'qtxi sied plmt ajeo'
            }
        });

        const mailOptions = {
            from: 'pranavsonawane489@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Please use the following link to reset your password: http://localhost:3000/admin/resetpassword?token=${token}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).send({ msg: "Password reset link sent" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Update password
const updatePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    try {
        const decoded = jwt.verify(token, secret);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await AdminLogin.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.status(200).send({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    addAdmin,
    getAdmin,
    findAdmin,
    deleteAdmin,
    updateAdmin,
    login,
    resetPasswordRequest,
    updatePassword
};
