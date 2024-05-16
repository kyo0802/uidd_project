#!/usr/bin/env node

const fs = require('fs');
const mysql = require('mysql');
const config = require('./config');

// 
const connection = mysql.createConnection(config.mysql);

connection.connect(err => {
  if (err) {
    console.log('fail to connect:', err);
    process.exit();
  }
});

// Step 2: 
connection.query('CREATE TABLE IF NOT EXISTS account (email VARCHAR(30) PRIMARY KEY, password VARCHAR(20))');
connection.query('CREATE TABLE IF NOT EXISTS account_data (email VARCHAR(30) , f_name VARCHAR(5), l_name VARCHAR(5), identity VARCHAR(2), pet VARCHAR(10), county VARCHAR(5), dist VARCHAR(5), gps TINYINT(1) , FOREIGN KEY (email) REFERENCES account(email))')
connection.query('CREATE TABLE IF NOT EXISTS pet_data (pet VARCHAR(10), gender VARCHAR(2), size VARCHAR(2), age TINYINT(2))')//要加owner


//connection.query('DROP TABLE account'); 
//connection.query('DROP TABLE account_data'); 
//connection.query('DROP TABLE pet_data'); 


fs.readFile('account.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    connection.end();
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const accounts = jsonData.accounts;

    if (!accounts) {
      console.error('No accounts data found in JSON file.');
      connection.end();
      return;
    }
    
    accounts.forEach(account => {
      const insertAccountQuery = 'INSERT IGNORE INTO account (email,password) VALUES (?, ?)';
      connection.query(insertAccountQuery, [account.email, account.password], (err, result) => {
        if (err) console.log('fail to insert account:', err);
      });
      
      const insertAccountQuery_2 = 'INSERT IGNORE INTO account_data (email,f_name, l_name, identity, pet, county, dist, gps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(insertAccountQuery_2, [account.email, account.f_name, account.l_name, account.identity, account.pet, account.county, account.dist, account.gps], (err, result) => {
        if (err) console.log('fail to insert account:', err);
      });
    });

    // search email
    connection.query('SELECT email FROM account WHERE password ="abcabcabc"', function (error, results, fields) {
      if (error) throw error;
      console.log('My email is: ', results);
    });

  } catch (jsonErr) {
    console.error('Error parsing JSON:', jsonErr);
  }
});

fs.readFile('pet.json', 'utf8', (err, petData) => {
  if (err) {
    console.error('Error reading pet file:', err);
    connection.end(); 
    return;
  }

  try {
    const petJsonData = JSON.parse(petData);
    const pets = petJsonData.pets;

    if (!pets) {
      console.error('No pets data found in JSON file.');
      connection.end(); 
      return;
    }
    
    pets.forEach(pet => {
      const insertPetQuery = 'INSERT INTO pet_data (pet, gender, size, age) VALUES (?, ?, ?, ?)';
      connection.query(insertPetQuery, [pet.pet, pet.gender, pet.size, pet.age], (err, result) => {
        if (err) console.log('Failed to insert pet:', err);
      });
    });

  } catch (jsonErr) {
    console.error('Error parsing pet JSON:', jsonErr);
  } finally {
    connection.end(); 
  }
});
