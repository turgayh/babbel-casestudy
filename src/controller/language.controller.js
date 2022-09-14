const express = require("express");
const router = express.Router();
const v = require("../validation/language.validation");
router.post("/", v.createLanguageValidation, createLanguage);
router.get("/all", listAllLanguages);
router.put("/:id", v.createLanguageValidation, updateLanguage);
router.delete("/:id", deleteLanguage);
router.delete("/l/all", deleteAllLanguages);

// router.put("/user/picture/:id", v.updatePictureValidation, updatePicture);
router.patch("/:id", v.updateLanguageFieldValidation, updateLanguageField);

module.exports = router;

const languageService = require("../service/language.service");

// Add language
function createLanguage(req, res, next) {
  languageService
    .createLanguage(req.body, req.get("origin"))
    .then((user) => res.status(201).json({ isSuccess: true, data: user ?? {} }))
    .catch((e) => next(e));
}

// List all languages
function listAllLanguages(req, res, next) {
  languageService
    .listAllLanguages(req.body, req.get("origin"))
    .then((user) => res.status(200).json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

// Replace all fields for a single language
function updateLanguage(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  languageService
    .updateLanguage(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val ?? {} }))
    .catch(next);
}


// Delete 1 language
function deleteLanguage(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  languageService
    .hardDeleteLanguage(req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val }))
    .catch(next);
}

// Delete all languages
function deleteAllLanguages(req, res, next) {
  languageService
    .hardDeleteAllLanguages(req.body,req.get("origin"))
    .then(() => res.status(204).json({ isSuccess: true, data: {} }))
    .catch(next);
}

// Update 1 or more fields for a single language
function updateLanguageField(req, res, next) {
  languageService
    .updateUserField(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.status(204).json({ isSuccess: true, data: val }))
    .catch(next);
}
