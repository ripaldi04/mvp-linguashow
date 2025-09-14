-- MySQL schema for lingua-show

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  passwordHash VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS lessons (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS lesson_contents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lessonId INT NOT NULL,
  contentType VARCHAR(64),
  content LONGTEXT,
  INDEX (lessonId)
);

CREATE TABLE IF NOT EXISTS conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  lessonId INT NOT NULL,
  title VARCHAR(255),
  INDEX (lessonId)
);

CREATE TABLE IF NOT EXISTS conversation_lines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversationId INT NOT NULL,
  speaker VARCHAR(64),
  text TEXT,
  audioUrl VARCHAR(1024),
  INDEX (conversationId)
);

CREATE TABLE IF NOT EXISTS conversation_videos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  conversationId INT NOT NULL,
  url VARCHAR(1024),
  label VARCHAR(255),
  INDEX (conversationId)
);

CREATE TABLE IF NOT EXISTS user_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  lessonId INT NOT NULL,
  unlocked TINYINT(1) DEFAULT 0,
  INDEX (userId),
  INDEX (lessonId)
);

CREATE TABLE IF NOT EXISTS understanding_feedback (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  lessonId INT NOT NULL,
  status ENUM('understood','not_understood'),
  INDEX (userId),
  INDEX (lessonId)
);

CREATE TABLE IF NOT EXISTS practice_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  lessonId INT NOT NULL,
  lineId INT NOT NULL,
  transcribedText TEXT,
  accuracyScore FLOAT,
  fluencyScore FLOAT,
  INDEX (userId),
  INDEX (lessonId),
  INDEX (lineId)
);

CREATE TABLE IF NOT EXISTS practice_words (
  id INT AUTO_INCREMENT PRIMARY KEY,
  attemptId INT NOT NULL,
  word VARCHAR(255),
  status ENUM('correct','wrong','missing','extra','order_mismatch'),
  expected VARCHAR(255),
  position INT,
  INDEX (attemptId)
);

CREATE TABLE IF NOT EXISTS submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  userId INT NOT NULL,
  lessonId INT NOT NULL,
  transcribedText TEXT,
  accuracyScore FLOAT,
  fluencyScore FLOAT,
  INDEX (userId),
  INDEX (lessonId)
);


