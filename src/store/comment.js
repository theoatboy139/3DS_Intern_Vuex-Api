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
      axios.get(`http://localhost:3000/comments?postId=${postId}`).then(response => {
        context.commit('success', response.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
