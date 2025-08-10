import {pool} from '../config/db.js';

// Create a new status log entry
export async function createStatusLog({ ticket_id, old_status_id, new_status_id, changed_by }) {
  const result = await pool.query(
    `INSERT INTO ticket_status_log (ticket_id, old_status_id, new_status_id, changed_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [ticket_id, old_status_id, new_status_id, changed_by]
  );
  return result.rows[0];
}

// Get status history for a ticket
export async function getStatusLogsByTicketId(ticket_id) {
  const result = await pool.query(
    `SELECT tsl.*, u.name AS changed_by_name, os.name AS old_status, ns.name AS new_status
     FROM ticket_status_log tsl
     JOIN users u ON tsl.changed_by = u.id
     JOIN ticket_statuses os ON tsl.old_status_id = os.id
     JOIN ticket_statuses ns ON tsl.new_status_id = ns.id
     WHERE ticket_id = $1
     ORDER BY changed_at DESC`,
    [ticket_id]
  );
  return result.rows;
}
