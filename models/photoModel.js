import { pool } from '../config/db.js';

// Insert a new photo for a ticket
export async function addPhoto({ ticket_id, type, url }) {
  const result = await pool.query(
    `INSERT INTO photos (ticket_id, type, url)
     VALUES ($1, $2, $3) RETURNING id`,
    [ticket_id, type, url]
  );
  return result.rows[0];
}

// Get all photos by ticket ID
export async function getPhotosByTicketId(ticketId) {
  const result = await pool.query(
    `SELECT * FROM photos WHERE ticket_id = $1 ORDER BY created_at DESC`,
    [ticketId]
  );
  return result.rows;
}
