import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    isLoading: false
  },
  mutations: {
    success (state, payload) {
      state.items = payload
      state.count = payload.length
      state.isLoading = false
    },
    loading (state) {
      state.isLoading = true
    }
  },
  actions: {
    get (context, postId) {
      context.commit('loading')
      console.log('fetching', `http://localhost:3000/posts?id=${postId}`)
      axios.get(`http://localhost:3000/posts?id=${postId}`).then(response => {
        context.commit('success', response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
