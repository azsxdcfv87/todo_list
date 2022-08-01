const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
const app = express()
const port = 3000

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

app.use(bodyParser.urlencoded({ extended: true }))

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

app.use(routes)


app.listen(port, () => {
  console.log(`APP is running http://localhost:${port}`)
})