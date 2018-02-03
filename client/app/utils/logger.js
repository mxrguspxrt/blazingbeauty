import Ember from 'ember'

let Logger = Ember.Object.extend({

  debug(...args) {
    console.log(args)
  },

  info(...args) {
    console.log(args)
  }

})

let logger = Logger.create({
})

export default logger
