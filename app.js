const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const app = express()
const port = 3000

const Todo = require('./models/todo') // 載入 Todo model

app.engine('handlebars', exphbs.engine({ defaultLayout: 'main', extname: '.handlebars' }))
app.set('view engine', 'handlebars')

// 載入 mongoose, 設定連線 mongoDB
mongoose.connect(process.env.MONGODB_URI)
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('Mongoose error')
})
// 連線成功
db.once('open', () => {
  console.log('Mongoose Connected')
})

app.get('/', (req, res) => {
  Todo.find() // 取出 Todo model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(todos => res.render('index', { todos })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

app.listen(port, () => {
  console.log(`APP is running http://localhost:${port}`)
})