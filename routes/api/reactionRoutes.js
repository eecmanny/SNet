const router = require('express').Router();
const {
  // getSingleReactions,
  postSingleReaction,
  DeleteSingleReaction,
} = require('../../controllers/reactionController');

// /api/thought/:thoughtId/thoughtId/reactions
// router.route('/:thoughtId/reactions').get(getSingleReactions);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postSingleReaction);

// // /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(DeleteSingleReaction);

module.exports = router;
