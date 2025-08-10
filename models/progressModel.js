// models/progressModels.js

import { pool } from '../config/db.js';

export async function createProgressUpdate({ ticket_id, updated_by, progress }) {
  await pool.query(
    `INSERT INTO progress_updates (ticket_id, updated_by, progress)
     VALUES ($1, $2, $3)`,
    [ticket_id, updated_by, progress]
  );

  await pool.query(
    `UPDATE tickets SET progress = $1 WHERE id = $2`,
    [progress, ticket_id]
  );
}

export async function getProgressUpdatesByTicketId(ticket_id) {
  const result = await pool.query(
    `SELECT * FROM progress_updates WHERE ticket_id = $1 ORDER BY updated_at DESC`,
    [ticket_id]
  );
  return result.rows;
}
