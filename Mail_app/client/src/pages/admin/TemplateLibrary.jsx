import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Card, CardContent, CardMedia, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { API_URL } from '@/services/helper';
import { Add } from '@mui/icons-material';

const TemplateLibrary = () => {
  const [templates, setTemplates] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [design, setDesign] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/templates`);
        setTemplates(response.data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };

    fetchTemplates();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/templates/${id}`);
      setTemplates(templates.filter((template) => template._id !== id));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleEdit = (template) => {
    setSelectedTemplate(template);
    setName(template.name);
    setImage(template.imageUrl); 
    setDesign(template.design);
    setOpenDialog(true);
  };

  const handleSave = async () => {
    if (!name) {
      setError('Name is required');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('design', design);

    try {
      if (selectedTemplate && selectedTemplate._id) {
        await axios.put(`${API_URL}/api/templates/${selectedTemplate._id}`, formData);
        setTemplates((prev) =>
          prev.map((template) =>
            template._id === selectedTemplate._id ? { ...template, ...formData } : template
          )
        );
      } else {
        const response = await axios.post(`${API_URL}/api/templates`, formData);
        setTemplates((prev) => [...prev, response.data]);
      }

      setOpenDialog(false);
      setSelectedTemplate(null);
      setError('');
    } catch (error) {
      setError('Error saving template: ' + error.message);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTemplate(null);
    setError('');
  };

  return (
    <>
      
      <div className="relative min-h-screen flex flex-col items-center p-4">
        <div className="relative z-10 w-full max-w-7xl">
          <Typography variant="h4" component="h1" className="text-center font-bold mb-8 text-black">
            Template Library
          </Typography>
          <div className="flex justify-end mb-8 mt-4">
            <Button
              onClick={() => {
                setSelectedTemplate(null);
                setName('');
                setImage(null);
                setDesign('');
                setOpenDialog(true);
              }}
              variant="contained"
              size="large"
              className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600"
            >
              <Add className="mr-2" />
              Add New Template
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <Card key={template._id} className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs mx-auto">
                {template.imageUrl && (
                  <CardMedia
                    component="img"
                    image={template.imageUrl}
                    alt={template.name}
                    className="h-48 w-full object-cover" 
                  />
                )}
                <CardContent>
                  <Typography variant="h6" component="h2" className="mb-2 font-semibold text-center">
                    {template.name}
                  </Typography>
                </CardContent>
                <div className="flex justify-between space-x-10 mb-4 border-t border-gray-200 mx-4">
                  <Button
                    onClick={() => handleEdit(template)}
                    variant="contained"
                    className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600 mx-4"
                  >
                    <EditIcon className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(template._id)}
                    variant="contained"
                    className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600 mx-4"
                  >
                    <DeleteIcon className="mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{selectedTemplate ? 'Edit Template' : 'Add New Template'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mt-4"
            />
            <TextField
              margin="dense"
              label="Design"
              type="text"
              fullWidth
              multiline
              rows={4}
              value={design}
              onChange={(e) => setDesign(e.target.value)}
              className="mt-4"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default TemplateLibrary;
