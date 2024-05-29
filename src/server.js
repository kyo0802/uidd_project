/* Step 1:
 * insert this code snippet to `./ser.js`
 * storing config to variables is a good practice, see `port` in the code
 * learn the syntax of string interpolation in js, see `${port}` in the code
 * 將這段程式碼插入 `./ser.js`
 * 將 [port] 修改成合適的值
 * 將設定放在變數中是一種好習慣，參考程式中的 `port`
 * 學習 js 的 string interpolation 語法，參考程式中的 `${port}`
 */

// include `express`, you can use `import` now
// 載入 `express`, 現在可以放心使用 `import` 了
import express from 'express'
// const express = require('express')

import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體
const app = express()//跑express function回傳app物件

const port = 5678

const db = require('../db/mysql');

// handle `/step1` url
// 處理 `/step1` 網址
app.get('/step1', (req, res) => {
  // response browser
  // 回應瀏覽器
  res.send('<h1>hello world</h1>')
})
app.use(express.static(`${__dirname}/dist`))


app.get('/listall', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading HTML file');
      return;
    }
    res.send(data)});
});

app.get('/search', (req, res) => {
  const studentID = req.query.student_ID; 
  
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading JSON file');
      return;
    }
    
    let students = JSON.parse(data);
    
    const studentName = students[studentID];
    
    if (studentName) {
      res.status(200).send(`Hello, ${studentName}`); 
    } else {
      res.status(404).send('Student not found');
    }
  });
});


import bodyParser from 'body-parser'
// const bodyParser = require('body-parser')

// setup `body-parser`
// 設定 `body-parser`
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/add', (req, res) => {
  fs.readFile('../db/students.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading JSON file');
      return;
    }
    
    let students = JSON.parse(data);
    
    students[req.body.student_ID] = req.body.student_name;
    fs.writeFile('./students.json', JSON.stringify(students), (err) => {
      if (err) {
        res.status(500).send('Error writing JSON file');
        return;
      }
      
      res.status(200).send('added');
      
    });
  });
});

app.post('/delete', (req, res) => {
  fs.readFile('./students.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading JSON file');
      return;
    }
    
    let students = JSON.parse(data);
    
    const studentID = req.body.student_ID; 
    
    if (students.hasOwnProperty(studentID)) {
      delete students[studentID];
      
      fs.writeFile('./students.json', JSON.stringify(students), (err) => {
        if (err) {
          res.status(500).send('Error writing JSON file');
          return;
        }
        
        res.status(200).send('Student deleted successfully');
      });
    } else {
      res.status(404).send('Student not found');
    }
  });
});

/*
app.get('/users', (req, res) => {
    // 执行数据库查询
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving users from database');
            return;
        }
        res.json(results);
    });
});
*/


// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})
