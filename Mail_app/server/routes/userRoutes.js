const express = require('express');
const router = express.Router();
const { saveUser, getAllUsers, deleteUser, updateUserRole } = require('../controllers/userController');

router.post('/login', saveUser);
router.get('/users', getAllUsers);
router.delete('/users/:userId', deleteUser);
router.put('/users/:userId/role', updateUserRole);

module.exports = router;
