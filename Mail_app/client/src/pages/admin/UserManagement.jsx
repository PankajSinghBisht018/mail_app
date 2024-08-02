import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Avatar, Modal, Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import { useUser } from '@clerk/clerk-react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { API_URL } from '../../services/helper';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '10px',
  backdropFilter: 'blur(5px)',
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`${API_URL}/api/auth/users/${selectedUser._id}`);
      setUsers(users.filter((user) => user._id !== selectedUser._id));
      toast.success('User deleted successfully');
      setDialogOpen(false);
    } catch (error) {
      toast.error('Error deleting user');
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
     
      <Container>
        <ToastContainer position="top-right" />
        <Typography variant="h4" component="h2" className="text-center my-4">
          User Management
        </Typography>
        <Box className="relative bg-gray-800 p-4 rounded-lg shadow-lg"> 
        
          <TableContainer component={Paper} style={{ backgroundColor: '#424242' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ color: 'white' }}>Avatar</TableCell>
                  <TableCell style={{ color: 'white' }}>Name</TableCell>
                  <TableCell style={{ color: 'white' }}>Email</TableCell>
                  <TableCell style={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user && users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <Avatar src={user.imageUrl} />
                    </TableCell>
                    <TableCell style={{ color: 'white' }}>{user.name}</TableCell>
                    <TableCell style={{ color: 'white' }}>{user.email}</TableCell>
                    <TableCell>
                      <IconButton edge="end" onClick={() => handleDelete(user)}>
                        <Delete style={{ color: 'red' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Modal open={dialogOpen} onClose={handleCloseDialog}>
          <Box sx={modalStyle} className="bg-white rounded-lg p-6 relative">
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" className="text-center mb-4">
              Confirm Deletion
            </Typography>
            <Typography variant="body1" className="mb-4">
              Are you sure you want to delete the user "{selectedUser?.name}"? This action cannot be undone.
            </Typography>
            <Box className="flex justify-end gap-2">
              <Button onClick={handleCloseDialog} variant="contained" className="bg-yellow-500 text-black">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} variant="contained" className="bg-red-500 text-white">
                Confirm
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default UserManagement;
