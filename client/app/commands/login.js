import adapter from 'client/adapters/application'
import state from 'client/states/application'

export default function(params) {
  state.set('login.loading', true)
  adapter.request('login', params)
}

adapter.on('login', function(result) {
  let login = state.get('login')
  state.set('login', { ...login, ...result, loading: false })

  if (!result.errors) {
    state.get('route').transitionTo('index')
  }
})
