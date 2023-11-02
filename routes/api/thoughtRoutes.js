const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').put(updateThought);

module.exports = router;
