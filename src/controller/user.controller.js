const express = require("express");
const router = express.Router();
const v = require("../validation/user.validation");

router.post("", v.createUserValidation, createUser);
router.get("/:id", getUser);
router.put("/:id", v.updateUserValidation, updateUser);
router.delete("/:id", deleteUser);
router.put("/picture/:id", v.updatePictureValidation, updatePicture);
router.patch("/:id", v.updateUserFieldValidation, updateUserField);

module.exports = router;

const userService = require("../service/user.service");

function createUser(req, res, next) {
  userService
    .createUser(req.body, req.get("origin"))
    .then((user) => res.json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

function getUser(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  userService
    .getUserByID(req.params["id"], req.get("origin"))
    .then((user) => res.json({ isSuccess: true, data: user ?? {} }))
    .catch(next);
}

function updateUser(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }

  userService
    .updateUserInfo(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.json({ isSuccess: true, data: val }))
    .catch(next);
}

function deleteUser(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }

  userService
    .hardDeleteUser(req.params["id"], req.get("origin"))
    .then((val) => res.json({ isSuccess: true, data: val }))
    .catch(next);
}

function updatePicture(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }

  userService
    .updatePicture(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.json({ isSuccess: true, data: val }))
    .catch(next);
}

function updateUserField(req, res, next) {
  if (isNaN(Number(req.params["id"]))) {
    return res
      .status(400)
      .json({ isSuccess: false, data: {}, message: "Numbers only, please!" });
  }
  userService
    .updateUserField(req.body, req.params["id"], req.get("origin"))
    .then((val) => res.json({ isSuccess: true, data: val }))
    .catch(next);
}
