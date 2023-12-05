const express = require('express');
const { validateUserId, validateUser, validatePost } = require("../middleware/middleware")
// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const Users = require("./users-model")
const Posts = require("../posts/posts-model")

const router = express.Router();

router.get('/', (req, res, next) => {
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

router.post('/', validateUser, (req, res, next) => {
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

router.put('/:id', validateUser, validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const id = req.params.id
  const changes = req.name
  Users.update(id, {name: changes})
  .then(updatedUser => {
    res.status(202).json(updatedUser)
  })
  .catch(error => {
    next(error)
  })
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const id = req.params.id
  const user = await Users.getById(id)
  Users.remove(id)
  .then(() => {
    res.status(202).json(user)
  })
  .catch(error => {
    next(error)
  })
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  const id = req.params.id
  Users.getUserPosts(id)
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    next(error)
  })
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Posts.insert({user_id: req.params.id, text: req.text})
    .then(post => {
    res.status(202).json(post)
  })
  .catch(error => {
    next(error)
  })
});

router.use((error, req, res, next) => { // eslint-disable-line
  res.status(error.status || 500).json({
    message: error.message,
    customMessage: "Something bad inside the users router",
  });
});

// do not forget to export the router
module.exports = router 