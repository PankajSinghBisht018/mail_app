const User = require('../models/User');


const saveUser = async (req, res) => {
  const { clerkUserId, name, email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { clerkUserId },
      { name, email },
      { upsert: true, new: true }
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'name email imageUrl'); 
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

module.exports = { saveUser, getAllUsers, deleteUser };
