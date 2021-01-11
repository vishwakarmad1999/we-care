const express = require('express')
const bodyParser = require('body-parser')

const router = require('./routes/router')

const app = express()

app.use(bodyParser.json())
app.use("/", router)

app.listen(3000, () => {
  console.log("The server is running at Port No: 3000")
})