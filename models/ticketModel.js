import { pool } from '../config/db.js';

export async function createTicket(data) {
  const {
    ticket_number,
    type_id,
    status_id,
    estimated_duration_id,
    created_by,
    assignee,
    project_id,
    location_id,
    weather_id,
    title,
    description,
    due_date,
    progress,
    is_draft,
    is_local,
  } = data;

  const result = await pool.query(
    `INSERT INTO tickets (
      ticket_number, type_id, status_id, estimated_duration_id,
      created_by, assignee, project_id, location_id, weather_id,
      title, description, due_date, progress, is_draft, is_local
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
    RETURNING id`,
    [
      ticket_number,
      type_id,
      status_id,
      estimated_duration_id,
      created_by,
      assignee,
      project_id,
      location_id,
      weather_id,
      title,
      description,
      due_date,
      progress || 0,
      is_draft || false,
      is_local || false,
    ]
  );
  return result.rows[0];
}

export async function getAllTickets() {
  const result = await pool.query(`SELECT * FROM tickets ORDER BY created_at DESC`);
  return result.rows;
}

// 👇 Add dummy stubs to avoid import error
export async function getTicketById(id) {
  const result = await pool.query(`SELECT * FROM tickets WHERE id = $1`, [id]);
  return result.rows[0];
}

export async function updateTicketStatus(id, newStatusId) {
  const result = await pool.query(
    `UPDATE tickets SET status_id = $1 WHERE id = $2 RETURNING *`,
    [newStatusId, id]
  );
  return result.rows[0];
}

export async function deleteTicket(id) {
  const result = await pool.query(`DELETE FROM tickets WHERE id = $1 RETURNING *`, [id]);
  return result.rows[0];
}
