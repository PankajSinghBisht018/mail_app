const express = require('express');
const router = express.Router();
const upload = require('../cloudinary/multerConfig'); 
const templateController = require('../controllers/templateController');

router.post('/templates', upload.single('image'), templateController.createTemplate);
router.get('/templates', templateController.getAllTemplates);
router.get('/templates/:id', templateController.getTemplateById);
router.put('/templates/:id', upload.single('image'), templateController.updateTemplate);
router.delete('/templates/:id', templateController.deleteTemplate);

module.exports = router;
