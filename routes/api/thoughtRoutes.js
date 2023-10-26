const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  getSingleThoughtReactions,
  postSingleThoughtsReaction,
  DeleteSingleThoughtsReaction,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').put(updateThought);

// /api/thought/:thoughtId/thoughtId/reactions
router.route('/:thoughtId/reactions').get(getSingleThoughtReactions);

// /api/thought/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(postSingleThoughtsReaction);

// // /api/thought/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(DeleteSingleThoughtsReaction);

module.exports = router;
