import {pool} from '../config/db.js';

const seed = async () => {
  try {
    console.log('🚀 Seeding test data...');

    // --- 1. ticket_types
    await pool.query(`INSERT INTO ticket_types (name)
      VALUES ('Task'), ('Issue')
      ON CONFLICT DO NOTHING;`);

    // --- 2. ticket_statuses
    await pool.query(`INSERT INTO ticket_statuses (name)
      VALUES ('Draft'), ('In Progress'), ('Completed'), ('Blocked')
      ON CONFLICT DO NOTHING;`);

    // --- 3. estimated_durations
    await pool.query(`INSERT INTO estimated_durations (label)
      VALUES ('2h'), ('4h'), ('1 day'), ('2 days')
      ON CONFLICT DO NOTHING;`);

    // --- 4. users
    await pool.query(`INSERT INTO users (name, email)
      VALUES 
      ('John Doe', 'john@example.com'),
      ('Alice Smith', 'alice@example.com'),
      ('Admin User', 'admin@clipycam.com');`);

    // --- 5. projects
    await pool.query(`INSERT INTO projects (name, description)
      VALUES 
      ('Gate Maintenance', 'Maintaining security and camera systems at main gates'),
      ('Lighting Upgrade', 'Replacing old bulbs with LEDs across buildings');`);

    // --- 6. locations
    await pool.query(`INSERT INTO locations (name, latitude, longitude)
      VALUES 
      ('Main Entrance', 40.7128, -74.0060),
      ('Back Lot', 40.7139, -74.0075);`);

    // --- 7. weather
    await pool.query(`INSERT INTO weather (condition, temperature, humidity, wind_speed)
      VALUES 
      ('Sunny', 29.5, 40.0, 12.3),
      ('Cloudy', 22.0, 65.0, 9.8);`);

    // --- 8. tickets
    await pool.query(`INSERT INTO tickets (
      ticket_number, type_id, status_id, estimated_duration_id, 
      created_by, assignee, project_id, location_id, weather_id,
      title, description, due_date, progress, is_draft, is_local)
      VALUES 
      ('TKT-1001', 1, 2, 1, 1, 2, 1, 1, 1,
        'Fix Main Gate Camera', 'Camera not recording events properly.', '2025-08-01', 25, false, false),
      ('TKT-1002', 2, 1, 3, 2, 1, 2, 2, 2,
        'Lighting Issue in Parking', 'Streetlight #5 flickers randomly.', '2025-08-03', 0, true, true);`);

    // --- 9. photos
    await pool.query(`INSERT INTO photos (ticket_id, type, url)
      VALUES 
      (1, 'before', 'https://example.com/photos/gate_before.jpg'),
      (1, 'after', 'https://example.com/photos/gate_after.jpg'),
      (2, 'support', 'https://example.com/photos/light_issue.jpg');`);

    // --- 10. annotations
    await pool.query(`INSERT INTO annotations (photo_id, content)
      VALUES 
      (1, 'Camera angle shows broken lens'),
      (3, 'Marking where flickering occurs');`);

    // --- 11. notifications
    await pool.query(`INSERT INTO notifications (ticket_id, message, send_at, triggered_by)
      VALUES 
      (1, 'Reminder: Task due today', CURRENT_TIMESTAMP, 'due_today'),
      (2, 'Ticket created successfully', CURRENT_TIMESTAMP, 'creation');`);

    // --- 12. ticket_status_log
    await pool.query(`INSERT INTO ticket_status_log (ticket_id, old_status_id, new_status_id, changed_by)
      VALUES 
      (1, 1, 2, 1),
      (1, 2, 3, 2);`);

    // --- 13. progress_updates
    await pool.query(`INSERT INTO progress_updates (ticket_id, updated_by, progress)
      VALUES 
      (1, 2, 25),
      (1, 2, 50),
      (2, 1, 10);`);

    console.log('✅ Test data inserted successfully!');
  } catch (err) {
    console.error('❌ Error seeding data:', err.message);
  } finally {
    pool.end();
  }
};

seed();
