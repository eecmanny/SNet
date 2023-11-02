const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const reactionRoutes = require('./reactionRoutes');
const userRoutes = require('./userRoutes');
const Thought = require('../../models/thought');
const User = require('../../models/user');
const Reaction = require('../../models/reaction');

router.use('/thought', reactionRoutes);
router.use('/thought', thoughtRoutes);
router.use('/user', userRoutes);

module.exports = router;
