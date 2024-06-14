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

app.use('/font', express.static(path.join(__dirname, 'font')));

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


app.post('/create_match', (req, res) => {
  const user1_email = req.body.user1_email;
  const user2_email = req.body.user2_email;

  if (!user1_email || !user2_email) {
    res.status(400).send('缺少必要的參數');
    return;
  }

  const sql = 'INSERT INTO matches (user1_email, user2_email) VALUES (?, ?)';
  const values = [user1_email, user2_email];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('配對創建失敗:', err);
      res.status(500).send('配對創建失敗');
      return;
    }

    const match_id = result.insertId; // 獲取新創建的 match_id
    res.json({ match_id: match_id });
  });
});

app.get('/get_messages', (req, res) => {
  const match_id = req.query.match_id;

  if (!match_id) {
    res.status(400).send({ error: '缺少必要的參數', code: 'MISSING_PARAMS' });
    return;
  }

  const sql = 'SELECT * FROM messages WHERE match_id = ? ORDER BY sent_at ASC';
  db.query(sql, [match_id], (err, results) => {
    if (err) {
      console.error('獲取訊息失敗:', err);
      if (err.code === 'ER_BAD_FIELD_ERROR') {
        res.status(400).send({ error: '無效的字段', code: 'INVALID_FIELD' });
      } else if (err.code === 'ER_NO_SUCH_TABLE') {
        res.status(500).send({ error: '資料庫表不存在', code: 'TABLE_NOT_FOUND' });
      } else {
        res.status(500).send({ error: '伺服器錯誤', code: 'SERVER_ERROR' });
      }
      return;
    }

    if (results.length === 0) {
      res.status(404).send({ error: '未找到消息', code: 'NO_MESSAGES_FOUND' });
      return;
    }

    res.json({ messages: results });
  });
});


app.post('/save_message', (req, res) => {
  const user = req.body.user;
  const match_id = req.body.match_id;
  const message = req.body.message;
  console.log('User: ', user);
  console.log('Match ID: ', match_id);
  console.log('Message: ', message);

  if (!user || !match_id || !message) {
    res.status(400).send('缺少必要的參數');
    return;
  }

  const sql = 'INSERT INTO messages (match_id, sender_email, message_text) VALUES (?, ?, ?)';
  const values = [match_id, user, message];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('訊息儲存失敗:', err);
      res.status(500).send('訊息儲存失敗');
      return;
    }
    res.send('訊息已成功儲存');
  });
});

// get CityCounty data json
app.get('/CityCountyData.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'CityCountyData.json'));
});

// chatgpt api
import cors from 'cors';
import axios from 'axios';
// 要執行
// npm install cors
// npm install express axios
// need to delete "node_modules/.bin/mime" file

// 允許跨域請求
app.use(cors());
app.use(express.json());

// 設定 OpenAI API 金鑰
// free api : https://github.com/popjane/free_chatgpt_api?tab=readme-ov-file#%E5%B8%B8%E7%94%A8%E5%BA%94%E7%94%A8%E6%94%AF%E6%8C%81
const apiKey = 'sk-XotdDMEEwDh8mZYE5e2aF7D2DeBc40EfB206E96e66E070F2';

app.post('/gpt', async(req, res) => {
  const message = req.body.userMessage;
  const url = 'https://free.gpt.ge/v1/chat/completions';
  const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
  };
  const data = {
      model: 'gpt-3.5-turbo-1106', // 或者你使用的其他模型
      messages: [
        {
          role: 'system',
          content: "預設成繁體中文，英文也可以，你要根據我以往的數據幫我分析最新的數據並提供健康的建議，回應盡量在20個字以內，不要一直給重複的建議，不要回答寵物相關以外的問題"
        },
        {
          role: 'system',
          content: "以下是我的寵物基本資料，年齡:1年6個月，體重:30公斤，體型:大型犬"
        },
        {
          role: 'system',
          content: "以下是我的平均紀錄，每日散步:2次，時長:42分鐘，距離:1.8公里"
        },
        {
            role: 'user',
            content: message
        }
      ],
      temperature: 0.5
  };

  try {
    const response = await axios.post(url, data, { headers });
    if (response.data && response.data.choices && response.data.choices.length > 0) {
        const chatResponse = response.data.choices[0].message.content;
        res.json(chatResponse);
    } else {
        console.error('Unexpected API response structure:', response.data);
        res.status(500).json({ error: 'Unexpected API response structure' });
    }
  } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Failed to get response from ChatGPT' });
  }
}) 


// start the server
// 啟動伺服器
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

