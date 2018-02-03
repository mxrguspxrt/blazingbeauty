import Ember from 'ember'
import state from 'client/states/application'

export default Ember.Route.extend({

  beforeModel: function() {
    state.set('route', this)
  }

})
