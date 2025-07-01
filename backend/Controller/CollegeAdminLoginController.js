const CollAdminLogin = require('../Models/CollegeAdminLoginModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = 'mysecretkey';

// Add a new college admin
const addCollAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = new CollAdminLogin({ email, password: hashedPassword });
        const collAdminData = await data.save();
        res.status(200).send({ collAdminData });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Get all college admins
const getCollAdmin = async (req, res) => {
    try {
        const data = await CollAdminLogin.find();
        res.status(200).send({ data });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// Find college admin by email
const findCollAdmin = async (req, res) => {
    try {
        const colladmin = await CollAdminLogin.findOne({ email: req.body.email });
        res.status(200).send({ colladmin });
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete college admin by email
const deleteCollAdmin = async (req, res) => {
    try {
        const result = await CollAdminLogin.deleteOne({ email: req.params.email });
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Update college admin status by email
const updateCollAdmin = async (req, res) => {
    try {
        const update = await CollAdminLogin.updateOne(
            { email: req.params.email },
            { $set: { Status: req.body.Status } }
        );
        res.status(200).send(update);
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

// CollegeAdmin login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const colladmin = await CollAdminLogin.findOne({ email });
        if (!colladmin) {
            return res.status(404).send({ msg: "College Admin not found" });
        }

        const isMatch = await bcrypt.compare(password, colladmin.password);
        if (!isMatch) {
            return res.status(401).send({ msg: "Incorrect password" });
        }

        const token = jwt.sign({ id: colladmin._id, email: colladmin.email }, secret, { expiresIn: '1h' });
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
        const colladmin = await CollAdminLogin.findOne({ email });
        if (!colladmin) {
            return res.status(404).send({ msg: "College Admin not found" });
        }

        const token = jwt.sign({ id: colladmin._id, email: colladmin.email }, secret, { expiresIn: '1h' });

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
            text: `Please use the following link to reset your password: http://localhost:3001/admin/ResetPassword?token=${token}`
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
        await CollAdminLogin.findByIdAndUpdate(decoded.id, { password: hashedPassword });

        res.status(200).send({ msg: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
};

module.exports = {
    addCollAdmin,
    getCollAdmin,
    findCollAdmin,
    deleteCollAdmin,
    updateCollAdmin,
    login,
    resetPasswordRequest,
    updatePassword
};
