const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Step 01:  Create User collection/table schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }
  ]
})

// Step 02:  create 'save' hook to hash password before saving
UserSchema.pre('save', async function(next) {
  let user = this
  // if user's password hasn't been modified, then don't hash it
  if (!user.isModified('password')) return next()

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(user.password, salt)
  user.password = hashedPassword
  next()
})

// Step 03: create User model based on the UserSchema we just defined
const User = mongoose.model('User', UserSchema)

module.exports = User
