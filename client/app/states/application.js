import Ember from 'ember'

let ApplicationState = Ember.Object.extend({
})

let state = window.state = ApplicationState.create({
})

export default state
