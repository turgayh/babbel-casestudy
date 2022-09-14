const { getUserByID } = require("../service/user.service");

const getProfile = async (req, res, next) => {
  const user_id = req.get("user_id");
  if (isNaN(Number(user_id))) {
    return res
      .status(401)
      .json({ isSuccess: false, data: {}, message: "Add user_id to header!" });
  }
  const userInfo = await getUserByID(user_id);
  if (!userInfo) return res.status(401).end();
  next();
};
module.exports = { getProfile };
