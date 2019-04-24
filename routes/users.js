var express = require('express')
const {
  findAll,
  findById,
  create
} = require('../repositories/UserRepository')
const Joi = require('joi')
var router = express.Router()

const createUserSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  pets: Joi.array()
})

const updateUserSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string(),
  password: Joi.string(),
  pets: Joi.array()
})

// GET: /users
router.get('/', async function(req, res) {
  try {
    // user populate to 'join' collections based on referencing objectId
    const users = await findAll()
    res.send(users)
  } catch (err) {
    res.status(400).send(err)
  }
})

// GET: /users/:id
router.get('/:id', async function(req, res) {
  const { id } = req.params
  const user = await findById(id)
  res.send(user)
})

// Post: /users
// create a new user
router.post('/', async (req, res) => {
  try {
    await Joi.validate(req.body, createUserSchema)
    const user = await create(req.body)
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err)
  }
})

// Put: /users
// update an existing user
router.put('/:id', async (req, res) => {
  try {
    await Joi.validate(req.body, updateUserSchema)

    const { id } = req.params
    let userInDb = await findById(id)
    const newUser = req.body

    for (const key in newUser) userInDb[key] = newUser[key]

    await userInDb.save()
    res.status(204).send(userInDb)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
