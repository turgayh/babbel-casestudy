const express = require("express");
const router = express.Router();
const v = require("../validation/lesson.validation");
router.post("/", v.createLessonValidation, createLesson);
router.get("/all", listAllLesson);
// router.put("/:id", v.createLanguageValidation, updateLanguage);
router.delete("/:id", deleteLesson);
// router.delete("/l/all", deleteAllLanguages);
// router.put("/user/picture/:id", v.updatePictureValidation, updatePicture);
router.patch("/:id", v.updateLessonFieldValidation, updateLessonField);

module.exports = router;

const lessonService = require("../service/lesson.service");

// Create new lesson
function createLesson(req, res, next) {
  lessonService
    .createLesson(req.body, req.get("origin"))
    .then((user) => res.status(201).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

// List all lessons
function listAllLesson(req, res, next) {
  lessonService
    .listAllLesson(req.body, req.get("origin"))
    .then((user) => res.status(200).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}



// Delete a lesson
function deleteLesson(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  lessonService
    .hardDeleteLesson(req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val }))
    .catch(next);
}

// Update 1 or more fields for a single lesson
function updateLessonField(req, res, next) {
  lessonService
    .updateLessonField(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val }))
    .catch(next);
}
