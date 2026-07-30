-- Revera Audiophile OS Normalized Database Schema (MySQL)

CREATE DATABASE IF NOT EXISTS revera_db;
USE revera_db;

-- 1. Users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('user', 'admin') DEFAULT 'user',
  hearing_profile_json JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Brands table
CREATE TABLE IF NOT EXISTS brands (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  country VARCHAR(50) NOT NULL,
  logo_url VARCHAR(255) NULL,
  website VARCHAR(255) NULL
);

-- 3. Driver Types table
CREATE TABLE IF NOT EXISTS driver_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT NULL
);

-- 4. Cables table
CREATE TABLE IF NOT EXISTS cables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  material VARCHAR(100) NOT NULL,
  connector_type VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- 5. DACs table
CREATE TABLE IF NOT EXISTS dacs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  chip VARCHAR(100) NOT NULL,
  output_power VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL
);

-- 6. Ear Tips table
CREATE TABLE IF NOT EXISTS ear_tips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  material VARCHAR(50) NOT NULL,
  bore_size VARCHAR(50) NOT NULL,
  sound_impact VARCHAR(255) NOT NULL
);

-- 7. IEMs table
CREATE TABLE IF NOT EXISTS iems (
  id INT AUTO_INCREMENT PRIMARY KEY,
  brand_id INT NOT NULL,
  driver_type_id INT NULL,
  name VARCHAR(150) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  sound_signature VARCHAR(100) NOT NULL,
  driver_topology VARCHAR(100) NOT NULL,
  impedance DECIMAL(6,2) NOT NULL,
  sensitivity DECIMAL(6,2) NOT NULL,
  connector VARCHAR(50) NOT NULL,
  overview TEXT NOT NULL,
  scores_json JSON NOT NULL,
  curve_json JSON NOT NULL,
  specs_json JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  FOREIGN KEY (driver_type_id) REFERENCES driver_types(id) ON DELETE SET NULL
);

-- 8. Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  iem_id INT NOT NULL,
  rating DECIMAL(3,1) NOT NULL,
  verdict TEXT NOT NULL,
  pros_json JSON NOT NULL,
  cons_json JSON NOT NULL,
  body TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (iem_id) REFERENCES iems(id) ON DELETE CASCADE
);

-- 9. Collections table (Owned, Wishlist, Favorites)
CREATE TABLE IF NOT EXISTS collections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  iem_id INT NOT NULL,
  status ENUM('owned', 'wishlist', 'favorite') NOT NULL,
  notes TEXT NULL,
  rating DECIMAL(3,1) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (iem_id) REFERENCES iems(id) ON DELETE CASCADE
);

-- 10. EQ Presets table
CREATE TABLE IF NOT EXISTS eq_presets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  gain_bass DECIMAL(4,1) DEFAULT 0.0,
  gain_mid DECIMAL(4,1) DEFAULT 0.0,
  gain_treble DECIMAL(4,1) DEFAULT 0.0,
  target_curve_name VARCHAR(100) DEFAULT 'Harman 2019v2',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 11. Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
