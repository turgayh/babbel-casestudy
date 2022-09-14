const { pool } = require("../config/db");

/// Create new user
async function createCourse(params) {
  try {
    const queryCourse = `INSERT INTO public.courses(
         name, user_id)
        VALUES ( '${params["name"]}', ${params["user_id"]} ) RETURNING id`;

    const data = await pool.query(queryCourse);

    params["lesson_ids"].forEach(async (l_id) => {
      const queryCourseList = `
      insert into course_lessons ( lesson_id, course_id)
      values (${l_id},${data.rows[0]["id"]});
      `;
      await pool.query(queryCourseList);
    });

    return data.rows;
  } catch (error) {
    throw new Error(error);
  }
}
async function listAllCourses() {
  const query = `SELECT
  c.id as course_id, l.id as lesson_id, c.name as course_name, l.name as lesson_name
FROM courses c
INNER JOIN course_lessons cl
ON c.id = cl.course_id
INNER JOIN lessons l on l.id = cl.lesson_id
order by l.created_on DESC`;

  try {
    const data = await pool.query(query);

    return data.rows;
  } catch (error) {
    throw new Error(error);
  }
}

async function listAllCoursesByUserID(id) {
  const query = `SELECT
  c.id as course_id, l.id as lesson_id, c.name as course_name, l.name as lesson_name
FROM courses c
INNER JOIN course_lessons cl
ON c.id = cl.course_id
INNER JOIN lessons l on l.id = cl.lesson_id
where c.user_id = ${id}
order by l.created_on DESC`;
  try {
    const data = await pool.query(query);

    return data.rows;
  } catch (error) {
    throw new Error(error);
  }
}

async function hardDeleteCourse(user_id, id) {
  const userCheck = `
  select * from courses where user_id = ${user_id} and id = ${id}
  `;
  const query = `
  begin;
    DELETE from course_lessons
      WHERE course_id = ${id};
    DELETE from courses
      WHERE id = ${id};
  commit;
  `;
  try {
    const check = await pool.query(userCheck);
    if (check.rowCount === 0) {
      throw new Error("Unauthorized");
    }
    await pool.query(query);
    return;
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createCourse,
  listAllCourses,
  listAllCoursesByUserID,
  hardDeleteCourse,
};
