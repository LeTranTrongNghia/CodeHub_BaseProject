import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 5000000 } }); //5mb file size limit

export default upload;
