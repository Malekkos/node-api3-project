const Users = require("../users/users-model")


function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log("The logger has ran")
  const method = req.method
  const url = req.url
  const timestamp = new Date().toISOString
  console.log(`The logger method is ${method}, the logger url is ${url}, the logger timestamp is ${timestamp}`)
  next()
}

async function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  console.log("Validating User Id...")
  const user = await Users.getById(req.params.id)
  if(!user) {
    res.status(404).json({
      message: "user not found"
    })
  } else {
    req.user = user
  }
  next()
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  console.log("Validating User...")
  console.log("this is the req.body", req.body)
  const { name } = req.body
  if(!name) {
    res.status(400).json({
      message: "missing required name field"
    }) 
  } else {
    req.name = name
  }
  next()
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  console.log("Validating Post...")
  console.log("this is the req body", req.body)
  const { text } = req.body
  if(!text) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    req.text = text
  }
  next()
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}