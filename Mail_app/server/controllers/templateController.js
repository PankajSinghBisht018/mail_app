const Template = require('../models/Template');

const createTemplate = async (req, res) => {
  try {
    const template = new Template({
      name: req.body.name,
      imageUrl: req.file.path, 
      design: req.body.design
    });
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.status(200).json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTemplateById = async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTemplate = async (req, res) => {
  try {
    const updatedTemplate = {
      name: req.body.name,
      imageUrl: req.file ? req.file.path : undefined, 
      design: req.body.design
    };

    const template = await Template.findByIdAndUpdate(req.params.id, updatedTemplate, { new: true });
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json(template);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTemplate = async (req, res) => {
  try {
    const template = await Template.findByIdAndDelete(req.params.id);
    if (!template) return res.status(404).json({ message: 'Template not found' });
    res.status(200).json({ message: 'Template deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createTemplate,getAllTemplates,getTemplateById,updateTemplate,deleteTemplate};
