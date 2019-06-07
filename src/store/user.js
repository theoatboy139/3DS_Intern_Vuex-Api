import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    isLoading: false,
    id: -1
  },
  mutations: {
    success (state, payload) {
      state.items = payload
      state.count = payload.length
      state.id = payload[0].userId
      state.isLoading = false
    },
    loading (state) {
      state.isLoading = true
    }
  },
  actions: {
    get (context, userId) {
      context.commit('loading')
      const route = 'https://jsonplaceholder.typicode.com/posts?userId=' + userId
      axios.get(route).then(response => {
        context.commit('success', response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
