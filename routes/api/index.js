const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');
const Thought = require('../../models/thought');
const User = require('../../models/user');

router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
