var express = require('express')
const Pet = require('../models/Pet')
const Joi = require('joi')
var router = express.Router()

const createPetSchema = Joi.object().keys({
  name: Joi.string().required(),
  age: Joi.number().required(),
  sex: Joi.string().required()
})

// Get pets listing
router.get('/', async (req, res) => {
  const pets = await Pet.find({})
  res.send(pets)
})

// Post:/pets
// Create a new pet record
router.post('/', async (req, res) => {
  try {
    await Joi.validate(req.body, createPetSchema)
    const pet = await Pet.create(req.body)
    res.status(201).send(pet)
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router
