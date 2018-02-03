import adapter from 'client/adapters/application'
import state from 'client/states/application'

export default function(params) {
  state.set('register.loading', true)
  adapter.request('register', params)
}

adapter.on('register', function(result) {
  let register = state.get('register')
  state.set('register', { ...register, ...result, loading: false })

  if (!result.errors) {
    state.get('route').transitionTo('index')
  }
})
