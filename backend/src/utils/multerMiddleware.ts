import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

// Create the uploads folder if it doesn't exist
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Set storage engine and destination for storing image files
const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, uploadDir);  // Store images in the 'uploads' folder
    },
    filename: (req: any, file: any, cb: any) => {
        cb(null, `${Date.now()}-${file.originalname}`);  // Rename file to avoid name conflicts
    },
});

// Filter to allow only specific file types (images)
const fileFilter = (req: any, file: any, cb: FileFilterCallback) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
};

// Configure multer with storage engine and file filter
const upload = multer({ storage, fileFilter });

// Export the multer middleware
export default upload;
