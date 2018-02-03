import BaseComponent from 'client/components/base-component'

export default BaseComponent.extend({

  actions: {

    inputChanged() {
      let errors = this.get('errors')
      if (errors) {
        this.set('errors', [])
      }
    }
  }

})
