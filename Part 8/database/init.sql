CREATE DATABASE IF NOT EXISTS books_lab;
USE books_lab;

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  author VARCHAR(150) NOT NULL
);

INSERT INTO books (title, author) VALUES
  ('Clean Code', 'Robert C. Martin'),
  ('The Pragmatic Programmer', 'Andrew Hunt'),
  ('Design Patterns', 'Erich Gamma');