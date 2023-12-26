const Contact = require("../model/Schema")

const contactController = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body
    if (!name || !email || !subject || !message)
      return res.json({ message: "Fill All The Fields", status: false })
    const contactData = new Contact({ name, email, subject, message })
    await contactData.save()
    res.redirect("/thankyou")
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}

module.exports = contactController
