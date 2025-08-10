import { pool } from '../config/db.js';

// Insert a new annotation for a photo
export async function addAnnotation({ photo_id, content }) {
  const result = await pool.query(
    `INSERT INTO annotations (photo_id, content)
     VALUES ($1, $2) RETURNING id`,
    [photo_id, content]
  );
  return result.rows[0];
}

// Get all annotations for a specific photo
export async function getAnnotationsByPhotoId(photoId) {
  const result = await pool.query(
    `SELECT * FROM annotations WHERE photo_id = $1 ORDER BY id ASC`,
    [photoId]
  );
  return result.rows;
}
