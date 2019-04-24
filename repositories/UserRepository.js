const User = require('../models/User')

const findAll = async () => {
  console.log('findAll')
  return await User.find({}, { __v: 0 })
}

const findById = async id => {
  return await User.findOne({ _id: id }, { __v: 0 }).populate('pets', {
    __v: 0
  })
}

const create = async newUser => {
  return await User.create(newUser)
}

const update = async (id, newUser) => {
  return await User.findOneAndUpdate({ _id: id }, newUser)
}

const remove = async id => {
  await User.findOneAndRemove({ _id: id })
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
}
