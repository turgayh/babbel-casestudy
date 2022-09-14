const { pool } = require("../config/db");

/// Create new user
async function createLanguage(params) {
  try {
    const query = `INSERT INTO public.languages(
         name, code, created_on)
        VALUES ( '${params["name"]}', '${params["code"]}' ,  NOW()) RETURNING id`;
    const resUser = await pool.query(query);

    return { ...resUser.rows[0] };
  } catch (error) {
    throw new error();
  }
}
async function listAllLanguages() {
  const query = `SELECT * FROM languages`;

  try {
    const languagesRow = await pool.query(query);
    let result = [];
    languagesRow.rows.forEach((val) => {
      result.push(val);
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateLanguage(params, id) {
  const query = `UPDATE public.languages
	SET  name='${params["name"]}', code='${params["code"]}'
	WHERE id = ${id}`;

  try {
    const user = await pool.query(query);
    return user.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}

async function hardDeleteLanguage(id) {
  const lessons = `
  select * from lessons where lang_id = ${id} 
`;
  const l = await pool.query(lessons);
  let lessons_ids = [];
  l.rows.forEach((val) => {
    lessons_ids.push(val["id"]);
  });
  if (lessons_ids.length === 0) lessons_ids.push(0);

  const query = `
  begin;
    DELETE from course_lessons where course_id IN (${lessons_ids.toString()});
    DELETE from lessons
      WHERE lang_id = ${id};
    DELETE from languages
      WHERE id = ${id};
  commit;
  `;
  console.log(query);
  try {
    await pool.query(query);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

async function hardDeleteAllLanguages() {
  const query = `begin;
  DELETE from course_lessons
  DELETE from lessons;
  DELETE from languages;
  commit;`;
  try {
    await pool.query(query);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

async function updateUserField(params, id) {
  const name = params["name"] ? `'${params["name"]}'` : null;
  const code = params["code"] ? `'${params["code"]}'` : null;

  const query = `UPDATE languages SET
    name = COALESCE(${name}, name),
    code = COALESCE(${code}, code)
  WHERE id = ${id} RETURNING code name`;
  console.log(query);
  try {
    const res = await pool.query(query);
    return res.rows[0];
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  createLanguage,
  listAllLanguages,
  updateLanguage,
  updateUserField,
  hardDeleteLanguage,
  hardDeleteAllLanguages,
};
