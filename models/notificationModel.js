import { pool } from '../config/db.js';

// Add a notification for a ticket
export async function addNotification({ ticket_id, message, send_at, triggered_by }) {
  const result = await pool.query(
    `INSERT INTO notifications (ticket_id, message, send_at, triggered_by)
     VALUES ($1, $2, $3, $4) RETURNING id`,
    [ticket_id, message, send_at, triggered_by]
  );
  return result.rows[0];
}

// Get all notifications for a specific ticket
export async function getNotificationsByTicketId(ticketId) {
  const result = await pool.query(
    `SELECT * FROM notifications WHERE ticket_id = $1 ORDER BY send_at ASC`,
    [ticketId]
  );
  return result.rows;
}
