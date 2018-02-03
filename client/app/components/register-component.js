import BaseComponent from 'client/components/base-component'
import Ember from 'ember'
import registerCommand from 'client/commands/register'

let alias = Ember.computed.alias

export default BaseComponent.extend({

  props: alias('state.register'),

  actions: {

    login() {
      let props = this.get('props')
      registerCommand(props)
    }

  }

})
