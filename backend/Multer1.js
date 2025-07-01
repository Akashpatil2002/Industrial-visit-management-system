const multer = require('multer');
const path = require('path');

const photoStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, './public/images'));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const fileName = path.basename(file.originalname, extension);
        cb(null, fileName + '-' + uniqueSuffix + extension); 
    }
});

const photoUpload = multer({
    storage: photoStorage
});

module.exports = photoUpload;
