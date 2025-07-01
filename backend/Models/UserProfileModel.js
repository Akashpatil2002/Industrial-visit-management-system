const UserProfile =require('mongoose')

const Profile = new UserProfile.Schema({

    company: { type: String, default: 'Sumago Infotech Pvt. Ltd.' },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    postalCode: { type: String },
    aboutMe: { type: String },
    profileImage: { type: String }
})

module.exports=UserProfile.model('ProMod',Profile)