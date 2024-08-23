import multer from 'multer';
const storage = multer.memoryStorage();


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10e6,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image'));
    }

    cb(null, true);
  },
});
export default upload;