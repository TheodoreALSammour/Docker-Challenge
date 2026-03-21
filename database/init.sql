CREATE DATABASE IF NOT EXISTS docker_lab;
USE docker_lab;

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255)
);

INSERT INTO items (name, description) VALUES
  ('Docker', 'Container platform'),
  ('Nginx', 'Web server'),
  ('Express', 'Node.js framework');