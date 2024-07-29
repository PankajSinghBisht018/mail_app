const express = require('express');
const router = express.Router();
const { saveUser,getAllUsers,deleteUser } = require('../controllers/userController');

router.post('/login', saveUser);
router.get('/users', getAllUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;
