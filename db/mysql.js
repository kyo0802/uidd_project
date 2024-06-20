const mysql = require('mysql');
const config = require('./config');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection(config.mysql);

connection.connect(err => {
  if (err) {
    console.log('fail to connect:', err);
    process.exit();
  }
});

connection.query('SET NAMES utf8mb4', (err) => {
  if (err) {
    console.log('Error setting character set:', err);
    process.exit();
  }
});

connection.query('CREATE TABLE IF NOT EXISTS account (email VARCHAR(30) PRIMARY KEY, password VARCHAR(20)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
connection.query('CREATE TABLE IF NOT EXISTS account_data (email VARCHAR(30), f_name VARCHAR(10), l_name VARCHAR(10), identity VARCHAR(8), pet VARCHAR(15), county VARCHAR(10), dist VARCHAR(10), gps TINYINT(1), FOREIGN KEY (email) REFERENCES account(email)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
connection.query('CREATE TABLE IF NOT EXISTS pet_data (pet VARCHAR(15), gender VARCHAR(10), size VARCHAR(10), age VARCHAR(10), image VARCHAR(255), PRIMARY KEY(pet)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci');
connection.query('CREATE TABLE IF NOT EXISTS matches (match_id INT AUTO_INCREMENT PRIMARY KEY,user1_email VARCHAR(30),user2_email VARCHAR(30),match_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (user1_email) REFERENCES account(email),FOREIGN KEY (user2_email) REFERENCES account(email)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;');
connection.query('CREATE TABLE IF NOT EXISTS messages (message_id INT AUTO_INCREMENT PRIMARY KEY,match_id INT,sender_email VARCHAR(30),message_text TEXT,sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY (match_id) REFERENCES matches(match_id),FOREIGN KEY (sender_email) REFERENCES account(email)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;')
connection.query('CREATE TABLE IF NOT EXISTS walk_data (walk_id INT AUTO_INCREMENT,pet VARCHAR(15), walk_date DATE,walk_time TIME,duration FLOAT,distance FLOAT, route TINYINT(1),A TINYINT(1),B TINYINT(1),satisfaction TINYINT(1),PRIMARY KEY(walk_id),FOREIGN KEY (pet) REFERENCES pet_data(pet)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;')
connection.query('CREATE TABLE IF NOT EXISTS walk_id_data (walk_id INT,rating TINYINT(1),water INT,note VARCHAR(255),master_rating TINYINT(1),happiness TINYINT(1),FOREIGN KEY (walk_id) REFERENCES walk_data(walk_id)) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;')

const imagePath = path.join(__dirname, '../images/dogs/153.png');
const query = 'INSERT INTO pet_data (pet, gender, size, age, image) VALUES (?, ?, ?, ?, ?)';
const petData = ['Maxi', 'male', 'large', 'adult', imagePath];

connection.query(query, petData, (error, results) => {
  if (error) {
    console.log('Error inserting data:', error);
  } else {
     console.log('Data inserted successfully');
   }
});

const query_2 = 'INSERT INTO walk_data (pet, walk_date, walk_time, duration, distance, route, A, B, satisfaction) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
const walkdata = ['Maxi', '2024-06-15', '14:30:00', 1.5, 3.2, 1, 0, 1, 1];

connection.query(query_2, walkdata, (error, results) => {
  if (error) {
    console.log('Error inserting data:', error);
  } else {
     console.log('Data inserted successfully');
   }
});// Drop tables in the correct order to handle foreign key constraint

// Export the connection object

module.exports = { connection };
