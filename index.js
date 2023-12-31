const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const { engine } = require("express-handlebars")
const mongoose = require("mongoose")
require("dotenv").config()
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static("public"))
app.engine(".hbs", engine({ extname: ".hbs" }))
app.set("view engine", ".hbs")
app.set("views", "./views")
app.use(require("./Routes/route"))
DB_link = process.env.MONGO
port = process.env.PORT || 3000

// For Removal of MongoDB Deprication Warning
mongoose.set({
  strictQuery: true,
})

// DataBase Connection

mongoose
  .connect(process.env.DB_LINK)
  .then(() => {
    console.log("Connection Successful")
  })
  .catch((err) => {
    if (err) {
      console.log("Connection Unsuccessful")
    }
  })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
