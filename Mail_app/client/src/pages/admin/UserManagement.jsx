import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, IconButton, Avatar, Modal, Button, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useMediaQuery } from '@mui/material';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import GridPattern from '@/components/magicui/grid-pattern';
import { useUser } from '@clerk/clerk-react';
import { Skeleton } from '@/components/ui/skeleton';
import { API_URL } from '@/services/helper';

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
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { user } = useUser();
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/auth/users`);
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (user) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedUser?.clerkUserId) {
      console.error('No clerkUserId found for selected user');
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/auth/users/${selectedUser.clerkUserId}`);
      setUsers(users.filter((user) => user.clerkUserId !== selectedUser.clerkUserId));
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

  const handleRoleChange = async (userId, newRole) => {
    try {
      await axios.put(`${API_URL}/api/auth/users/${userId}/role`, { role: newRole });
      setUsers(users.map((user) => (user.clerkUserId === userId ? { ...user, role: newRole } : user)));
      toast.success('User role updated successfully');
    } catch (error) {
      toast.error('Error updating user role');
      console.error('Error updating user role:', error);
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center">
      <Container>
        <GridPattern />
        <ToastContainer position="top-right" />
        <Typography variant="h4" component="h2" className="text-center my-4">
          User Management
        </Typography>
        <Box className="relative bg-gray-800 p-4 rounded-lg shadow-lg">
          <TableContainer component={Paper} style={{ backgroundColor: '#424242' }}>
            {loading ? (
              <div className="animate-pulse">
                <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
                <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
                <Skeleton className="h-6 bg-gray-600 rounded-md mb-2" />
              </div>
            ) : (
              <Table>
                <TableHead>
                  <TableRow>
                    {!isMobile && <TableCell style={{ color: 'white' }}>Avatar</TableCell>}
                    <TableCell style={{ color: 'white' }}>Name</TableCell>
                    {!isMobile && <TableCell style={{ color: 'white' }}>Email</TableCell>}
                    <TableCell style={{ color: 'white' }}>Role</TableCell>
                    <TableCell style={{ color: 'white' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user && users.map((user) => (
                    <TableRow key={user.clerkUserId}>
                      {!isMobile && (
                        <TableCell>
                          <Avatar src={user.imageUrl} />
                        </TableCell>
                      )}
                      <TableCell style={{ color: 'white' }}>{user.name}</TableCell>
                      {!isMobile && <TableCell style={{ color: 'white' }}>{user.email}</TableCell>}
                      <TableCell>
                        <Select
                          value={user.role || ''}
                          onChange={(e) => handleRoleChange(user.clerkUserId, e.target.value)}
                          className='bg-white text-black'
                        >
                          <MenuItem value="admin">Admin</MenuItem>
                          <MenuItem value="developer">Developer</MenuItem>
                          <MenuItem value="user">User</MenuItem>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDelete(user)} variant="contained"
                          className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600 mx-4">
                          <DeleteIcon className="mr-2" />
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
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
              <Button onClick={handleCloseDialog} variant="contained" className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600 mx-4">
                Cancel
              </Button>
              <Button onClick={handleConfirmDelete} variant="contained" className="flex items-center bg-gradient-to-r from-yellow-500 to-orange-600 text-white hover:bg-yellow-600 mx-4">
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
