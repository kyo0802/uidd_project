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


const imagePath = path.join(__dirname, '../images/dogs/156.png');
const query = 'INSERT INTO pet_data (pet, gender, size, age, image) VALUES (?, ?, ?, ?, ?)';
    const petData = ['rain', 'female', 'medium', 'adult', imagePath];

    connection.query(query, petData, (error, results) => {
      if (error) {
        console.log('Error inserting data:', error);
      } else {
        console.log('Data inserted successfully');
      }
    });
function getAllCards() {
  return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM pet_data', (error, results) => {
          if (error) {
              return reject(error);
          }
          resolve(results);
      });
  });
}
/*
connection.query('DROP TABLE IF EXISTS account');
connection.query('DROP TABLE IF EXISTS account_data');
connection.query('DROP TABLE IF EXISTS pet_data');

*/
// Export the connection object

module.exports = { getAllCards, connection };
