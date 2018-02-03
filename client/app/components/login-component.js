import BaseComponent from 'client/components/base-component'
import Ember from 'ember'
import loginCommand from 'client/commands/login'

let alias = Ember.computed.alias

export default BaseComponent.extend({

  props: alias('state.login'),

  actions: {

    login() {
      let props = this.get('props')
      loginCommand(props)
    }

  }

})
