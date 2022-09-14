const express = require("express");
const router = express.Router();
const v = require("../validation/course.validation");

router.post("/", v.createCourseValidation, createCourse);
router.get("/all", listAllCourses);
router.get("/all/:userID", listAllCoursesByUserID);
router.delete("/:id", deleteCourse);


module.exports = router;
const courseService = require("../service/course.service");

// Create a new course
function createCourse(req, res, next) {
  courseService
    .createCourse(req.body, req.get("origin"))
    .then((user) => res.status(201).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

// List all courses
function listAllCourses(req, res, next) {
  courseService
    .listAllCourses(req.body, req.get("origin"))
    .then((user) => res.status(200).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

// List all courses from a single user
function listAllCoursesByUserID(req, res, next) {
  if (req.params["userID"] !== req.get("user_id"))
    return res
      .status(401)
      .json({ isSuccess: false, data: {}, message: "user id does not match!" });

  courseService
    .listAllCoursesByUserID(req.get("user_id"), req.get("origin"))
    .then((user) => res.status(200).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

// Delete course
function deleteCourse(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  courseService
    .hardDeleteCourse(req.get("user_id"), req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val }))
    .catch(next);
}

// Update 1 or more fields for a single course
// function updateCourseField(req, res, next) {
//   courseService
//     .updateLanguageField(req.body, req.params["id"], req.get("origin"))
//     .then((val) => res.status(204).json({ isSuccess: true, data: val }))
//     .catch(next);
// }
