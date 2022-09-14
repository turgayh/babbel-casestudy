const { pool } = require("../config/db");

/// Create new user
async function createLesson(params) {
  try {
    const query = `INSERT INTO public.lessons(
         name, lesson_text,lang_id, created_on)
        VALUES ( '${params["name"]}', '${params["lesson_text"]}' ,'${params["lang_id"]}',  NOW()) RETURNING id`;
    const resUser = await pool.query(query);

    return { ...resUser.rows[0] };
  } catch (error) {
    throw new Error(error);
  }
}
async function listAllLesson() {
  const query = `SELECT * FROM lessons`;

  try {
    const res = await pool.query(query);
    let result = [];
    res.rows.forEach((val) => {
      result.push(val);
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

async function hardDeleteLesson(id) {
  const query = `begin;
  DELETE from lessons
          WHERE id = ${id};
  commit;`;
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function updateLessonField(params, id) {
  const name = params["name"] ? `'${params["name"]}'` : null;
  const lesson_text = params["lesson_text"] ? `'${params["lesson_text"]}'` : null;

  const query = `UPDATE languages SET
    name = COALESCE(${name}, name),
    lesson_text = COALESCE(${lesson_text}, lesson_text)
  WHERE id = ${id} RETURNING code name lang_id`;
  console.log(query);
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  listAllLesson,
  createLesson,
  hardDeleteLesson,
  updateLessonField
};
