function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log("The logger has ran")
  const method = req.method
  const url = req.url
  const timestamp = new Date().toISOString
  console.log(`The logger method is ${method}, the logger url is ${url}, the logger timestamp is ${timestamp}`)
  next()
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost,
}