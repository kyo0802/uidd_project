import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import mysql from 'mysql';
import config from './db/config.js';
import bodyParser from 'body-parser';
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// create an express, aka web server, instance
// 建立一個 express (也就是網頁伺服器)實體


const db = mysql.createConnection(config.mysql);

db.connect(err => {
  if (err) {
    console.log('fail to connect:', err);
    process.exit();
  }
});


const app = express()//跑express function回傳app物件

const port = 5920

// handle `/step1` url
// 處理 `/step1` 網址
app.get('/step1', (req, res) => {
  // response browser
  // 回應瀏覽器
  res.send('hello world')
})



// 設置靜態文件目錄
app.use(express.static(`${__dirname}/src`, {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now());
  }
}));


// 設置圖片文件目錄
app.use('/images', express.static(path.join(__dirname, 'images')));

// 設置根路徑指向 aboutus.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'aboutus.html'));
});

// setup `body-parser`
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/register', (req, res) => {
      // 構建新的帳戶對象
      const newaccount = {
        email: req.body.account,
        password: req.body.password,
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        identity: req.body.identity,
        pet: req.body.petname,
        county: req.body.region,
        dist: req.body.district,
        gps: req.body.gps
      };
      
      console.log(newaccount);

      // 構建新的寵物對象
      const newpet = {
        pet: req.body.petname,
        gender: req.body.petgender,
        size: req.body.petsize,
        age: req.body.petage
      };

      console.log(newpet);

      let check_email = 'SELECT * FROM account WHERE email = ?';
      db.query(check_email, [newaccount.email], (error, results) => {
        if (error) {
          res.status(500).send('Error querying the database');
          return;
        }
        
        if (results.length > 0) {
          res.status(409).send('Account already exists');
          return;
        } 
        else {
          // 添加新帳戶到資料庫
          let insert_account = 'INSERT INTO account (email,password) VALUES (?, ?)';
          db.query(insert_account, [newaccount.email, newaccount.password], (error) => {
            if (error) {
              console.error(error);
              res.status(500).send('Error inserting new account into the database');
              return;
            }
          // 添加新帳戶資料到資料庫
            let insert_accountdata = 'INSERT INTO account_data (email,f_name, l_name, identity, pet, county, dist, gps) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            db.query(insert_accountdata, [newaccount.email, newaccount.f_name, newaccount.l_name, newaccount.identity, newaccount.pet, newaccount.county, newaccount.dist, newaccount.gps], (error, results, fields) => {
              if (error) {
                console.error(error);
                res.status(500).send('Error inserting new account data into the database');
                return;
              }
            // 插入新寵物到資料庫
              let insert_pet = 'INSERT INTO pet_data (pet, gender, size, age) VALUES (?, ?, ?, ?)';
              db.query(insert_pet, [newpet.pet, newpet.gender, newpet.size, newpet.age], (error, results, fields) => {
                if (error) {
                  console.error(error);
                  res.status(500).send('Error inserting new pet into the database');
                  return;
                }
                res.status(200).send('Account and pet added successfully');
              });
            }); 
          });
        }
    });
});

app.post('/login', (req, res) => {
  const account = req.body.account;
  const password =  req.body.password;
  let check_account = 'SELECT * FROM account WHERE email =?';
  db.query(check_account, [account], (error, results) => {
    if(error){
      res.status(500).send('Error querying the database');
      return;
    }

    if(results.length == 0){
      res.status(404).send('Account not found');
      return;
    }
    else{
      if(results[0].password ==  password){
        res.status(200).send('Login successfully');
      }
      else{
        res.status(401).send('Wrong password');
      }
    }
  });
});

// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

