const express = require('express');
const { validateUserId, validateUser } = require("../middleware/middleware")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require("./users-model")
const Posts = require("../posts/posts-model")

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id',validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  const user = req.user
  res.status(200).json(user)
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  const name = req.name
  Users.insert({ name: name })
  .then(newUser => {
    res.status(201).json(newUser)
  })
  .catch(error => {
    next(error)
  })

});

router.put('/:id', validateUser, validateUserId, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  console.log("this is the req.user", req.user, "this is the req.name", req.name)

});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((error, req, res, next) => { //eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something has gone wrong inside of the users-router"
  })
})

// do not forget to export the router
module.exports = router 