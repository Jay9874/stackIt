const express = require('express');
const router = express.Router();
const multer = require('multer');
const verifyToken = require('../middlewares/verifyToken');
const {
    getAllQuestions,
    uploadImage,
    saveQuestion,
    saveAnswer,
    getQAsById,
} = require('../controllers/qaControllers');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/all', getAllQuestions);
router.post('/upload-image', verifyToken, upload.single('image'), uploadImage);
router.post('/save-question', verifyToken, saveQuestion);
router.post('/save-answer', verifyToken, saveAnswer);
router.get('/:id', getQAsById);

module.exports = router;