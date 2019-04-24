const mongoose = require('mongoose')
const bluebird = require('bluebird')

mongoose.Promise = bluebird

mongoose
  .connect(`mongodb://admin:admin2019@ds157923.mlab.com:57923/nicole-express`, {
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => console.log('mongodb connected'))
  .catch(err => console.log(err))

module.exports = mongoose
