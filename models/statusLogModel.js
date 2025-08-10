import {pool} from '../config/db.js';

export async function insertStatusLog({ ticket_id, old_status_id, new_status_id, changed_by }) {
  const result = await pool.query(
    `INSERT INTO ticket_status_log (ticket_id, old_status_id, new_status_id, changed_by)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [ticket_id, old_status_id, new_status_id, changed_by]
  );
  return result.rows[0];
}