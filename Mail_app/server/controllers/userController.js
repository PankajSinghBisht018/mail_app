const { clerkClient } = require('@clerk/clerk-sdk-node');
const User = require('../models/User');

const saveUser = async (req, res) => {
  const { clerkUserId, name, email, role, imageUrl } = req.body; 
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const user = await User.findOneAndUpdate(
        { email },
        { name, clerkUserId, role, imageUrl }, 
        { new: true }
      );
      return res.status(200).json({ success: true, user });
    } else {
      const user = await User.findOneAndUpdate(
        { clerkUserId },
        { name, email, role, imageUrl }, 
        { upsert: true, new: true }
      );
      return res.status(200).json({ success: true, user });
    }
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'clerkUserId name email imageUrl role'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  console.log('Attempting to delete user with ID:', userId); 

  try {
    await clerkClient.users.deleteUser(userId);
    console.log('Deleted user from Clerk');
    await User.findOneAndDelete({ clerkUserId: userId });
    console.log('Deleted user from local database');
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

const updateUserRole = async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role },
    });
    await User.findOneAndUpdate({ clerkUserId: userId }, { role }, { new: true });
    res.status(200).json({ message: 'User role updated' });
  } catch (error) {
    console.error('Error updating user role:', error);
    res.status(500).json({ error: 'Failed to update user role' });
  }
};

module.exports = { saveUser, getAllUsers, deleteUser, updateUserRole };
