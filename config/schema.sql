-- Create referenced lookup tables first
CREATE TABLE IF NOT EXISTS ticket_types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ticket_statuses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS estimated_durations (
    id SERIAL PRIMARY KEY,
    label VARCHAR(20) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);

CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS locations (
    id SERIAL PRIMARY KEY,
    name TEXT,
    latitude DECIMAL,
    longitude DECIMAL
);

CREATE TABLE IF NOT EXISTS weather (
    id SERIAL PRIMARY KEY,
    condition TEXT,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2),
    wind_speed DECIMAL(5,2),
    captured_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  ticket_id INT REFERENCES tickets(id) ON DELETE CASCADE,
  type VARCHAR(20) CHECK (type IN ('before', 'during', 'after', 'support')),
  url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS annotations (
  id SERIAL PRIMARY KEY,
  photo_id INT REFERENCES photos(id) ON DELETE CASCADE,
  content TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  ticket_id INT REFERENCES tickets(id) ON DELETE CASCADE,
  message TEXT,
  send_at TIMESTAMP,
  triggered_by TEXT CHECK (triggered_by IN ('creation', 'due_today', 'status_change'))
);

CREATE TABLE IF NOT EXISTS ticket_status_log (
  id SERIAL PRIMARY KEY,
  ticket_id INT REFERENCES tickets(id) ON DELETE CASCADE,
  old_status_id INT REFERENCES ticket_statuses(id),
  new_status_id INT REFERENCES ticket_statuses(id),
  changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  changed_by INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS progress_updates (
  id SERIAL PRIMARY KEY,
  ticket_id INT REFERENCES tickets(id) ON DELETE CASCADE,
  updated_by INT REFERENCES users(id),
  progress INT CHECK (progress BETWEEN 0 AND 100),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- NOW define the tickets table
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    ticket_number VARCHAR(20) UNIQUE NOT NULL,
    type_id INT REFERENCES ticket_types(id),
    status_id INT REFERENCES ticket_statuses(id),
    estimated_duration_id INT REFERENCES estimated_durations(id),
    created_by INT REFERENCES users(id),
    assignee INT REFERENCES users(id),
    project_id INT REFERENCES projects(id),
    location_id INT REFERENCES locations(id),
    weather_id INT REFERENCES weather(id),
    title TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    progress INT CHECK (progress BETWEEN 0 AND 100) DEFAULT 0,
    is_draft BOOLEAN DEFAULT FALSE,
    is_local BOOLEAN DEFAULT FALSE
);
