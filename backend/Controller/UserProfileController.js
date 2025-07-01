const UserProfile = require('../Models/UserProfileModel');

// Create a new admin (Register)
const createUser = async (req, res) => {
    const { company, username, email, firstName, lastName, address, city, country, postalCode, aboutMe } = req.body;

    try {
        const existingAdmin = await UserProfile.findOne();
        if (existingAdmin) {
            return res.status(400).json({ error: 'An admin already exists. Only one admin is allowed.' });
        }

        const newUser = new UserProfile({
            company: company || 'Sumago Infotech Pvt. Ltd.',
            username,
            email,
            firstName,
            lastName,
            address,
            city,
            country,
            postalCode,
            aboutMe,
            profileImage: req.file ? req.file.filename : '' 
        });

        await newUser.save(); 
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Error creating admin' });
    }
};

// Update existing admin profile
const updateAdmin = async (req, res) => {
    const { username, email, firstName, lastName, address, city, country, postalCode, aboutMe } = req.body;

    try {
        const existingAdmin = await UserProfile.findOne();
        if (!existingAdmin) {
            return res.status(404).json({ error: 'No admin found to update' });
        }

        existingAdmin.username = username || existingAdmin.username;
        existingAdmin.email = email || existingAdmin.email;
        existingAdmin.firstName = firstName || existingAdmin.firstName;
        existingAdmin.lastName = lastName || existingAdmin.lastName;
        existingAdmin.address = address || existingAdmin.address;
        existingAdmin.city = city || existingAdmin.city;
        existingAdmin.country = country || existingAdmin.country;
        existingAdmin.postalCode = postalCode || existingAdmin.postalCode;
        existingAdmin.aboutMe = aboutMe || existingAdmin.aboutMe;
        if (req.file) {
            existingAdmin.profileImage = req.file.filename; 
        }

        const updatedAdmin = await existingAdmin.save(); 
        res.json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ error: 'Error updating admin' });
    }
};

// Get current admin profile
const getAdminProfile = async (req, res) => {
    try {
        const adminProfile = await UserProfile.findOne();
        if (!adminProfile) {
            return res.status(404).json({ error: 'No admin found' });
        }
        res.json(adminProfile);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching admin profile' });
    }
};

module.exports = {
    createUser,
    updateAdmin,
    getAdminProfile
};
