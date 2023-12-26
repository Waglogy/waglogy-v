const express = require("express")
const route = express.Router()
const IndexController = require("../controllers/IndexController")
const contactController = require("../controllers/contactController")
const educationController = require("../controllers/educationController")
const partnerController = require("../controllers/partnerController")
const internshipController = require("../controllers/internshipController")

// For Index (Home Page)

route.get("/", IndexController)

// For Contact Page

route.post("/contact", contactController)

// For Partners Page

route.get("/partner", partnerController)

// For Internship Page

route.get("/internship", internshipController)

// For Education Page

route.get("/education", educationController)

// For Thank You Page

route.get("/thankyou", (req, res) => {
  res.render("successful")
})

module.exports = route
