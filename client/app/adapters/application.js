import Ember from 'ember'
import logger from 'client/utils/logger'
import uid from 'client/utils/uid'

let ApplicationAdapter = Ember.Object.extend({

  init() {
    this.listeners = []
  },

  connect() {
    let adapter = this
    let ws = new WebSocket("ws://localhost:3000/api")

    ws.onopen = function() {
      logger.info(adapter, 'Connected with API')
    }

    ws.onmessage = function(event) {
      const hash = JSON.parse(event.data)
      adapter.receive(hash.command, hash.result)
    }

    this.ws = ws
  },

  request(command, params) {
    let sendStruct = {
      command,
      params
    }
    let sendJson = JSON.stringify(sendStruct)
    this.ws.send(sendJson)
  },

  receive(command, params) {
    this.trigger(command, params)
  },

  trigger(actionName, actionParams) {
    this.listeners.forEach(listener =>
      listener.action == actionName && listener.callback(actionParams)
    )
  },

  on(actionName, callback) {
    this.listeners.push({
      action: actionName,
      callback: callback
    })
  }

})

let adapter = window.adapter = ApplicationAdapter.create({
})

export default adapter
