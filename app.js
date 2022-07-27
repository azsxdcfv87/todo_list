const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

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
  res.send('Hello Kiki')
})

app.listen(port, () => {
  console.log(`APP is running http://localhost:${port}`)
})