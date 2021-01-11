const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./routes/router')

const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use("/", router)

const PORT_NUMBER = 4000

app.listen(PORT_NUMBER, () => {
  console.log("The server is running at Port No: " + PORT_NUMBER)
})