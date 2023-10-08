const router = require('express').Router();
const {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} = require('../../controllers/courseController.js');

// /api/courses
router.route('/').get(getCourses).post(createCourse);

// /api/courses/:courseId
router
  .route('/:courseId')
  .get(getSingleCourse)
  //.put is the dominant fuction being run. Then the updatecourse is the callback which wwill be run after the .put
  .put(updateCourse)
  .delete(deleteCourse);

module.exports = router;
