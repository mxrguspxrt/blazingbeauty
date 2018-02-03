import Ember from 'ember'

import adapter from 'client/adapters/application'
import state from 'client/states/application'

adapter.connect()

export default Ember.Component.extend({

  tagName: '',
  state: state,

  init() {
    this._super()
    this.set('props', {})
  },

  didDestroyElement() {
    this.set('props', null)
  }

})
