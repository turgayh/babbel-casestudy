const { pool } = require("../config/db");

/// Create new user
async function createUser(params) {
  try {
    const query = `INSERT INTO public.users(
         name, lastname, username, password,created_on)
        VALUES ( '${params["name"]}', '${params["lastname"]}', '${params["username"]}', '${params["password"]}' ,  NOW()) RETURNING id`;
    const resUser = await pool.query(query);
    const photoQuery = `INSERT INTO public.users_photo(
        user_id, img)
       VALUES (${resUser.rows[0]["id"]}, '${params["picture_code"]}')`;
    const resPhoto = await pool.query(photoQuery);
    return { ...resUser.rows[0], ...resPhoto.rows[0] };
  } catch (error) {
    throw new Error(error);
  }
}

async function getUserByID(id) {
  const query = `SELECT u.name , u.lastname, u.username, u.id, p.img FROM users as u
    JOIN users_photo as p
    ON u.id::INT = p.user_id
  WHERE
    u.id = ${id};`;

  try {
    const user = await pool.query(query);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUserInfo(params, id) {
  const query = `UPDATE public.users
	SET  name='${params["name"]}', lastname='${params["lastname"]}', username='${params["username"]}', password='${params["password"]}'
	WHERE id = ${id}`;

  try {
    const user = await pool.query(query);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function hardDeleteUser(id) {
  const courses = `
    select * from courses where user_id = ${id} 
`;
  const c = await pool.query(courses);
  let course_ids = [];
  c.rows.forEach((val) => {
    course_ids.push(val["id"]);
  });
  if (course_ids.length === 0) course_ids.push(0);
  const query = `begin;
  DELETE from course_lessons where course_id IN (${course_ids.toString()});
  DELETE from courses where id IN (${course_ids.toString()});
  DELETE from users_photo
    WHERE user_id = ${id};
  DELETE from users
    WHERE id = ${id};
  commit;`;
  try {
    console.log(query);
    await pool.query(query);
    return {};
  } catch (error) {
    throw new Error(error);
  }
}

async function updatePicture(params, id) {
  const query = `UPDATE public.users_photo
      SET  img='${params["picture_code"]}'
      WHERE id = ${id}`;

  try {
    const user = await pool.query(query);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUserField(params, id) {
  const name = params["name"] ? `'${params["name"]}'` : null;
  const lastname = params["lastname"] ? `'${params["lastname"]}'` : null;
  const username = params["username"] ? `'${params["username"]}'` : null;
  const password = params["password"] ? `'${params["password"]}'` : null;

  const query = `UPDATE users SET
    name = COALESCE(${name}, name),
    lastname = COALESCE(${lastname}, lastname),
    username = COALESCE(${username}, username),
    password = COALESCE(${password}, password)
  WHERE id = ${id};`;
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  createUser,
  getUserByID,
  updateUserInfo,
  hardDeleteUser,
  updatePicture,
  updateUserField,
};
