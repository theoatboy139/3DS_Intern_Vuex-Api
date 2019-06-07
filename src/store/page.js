import { postPerPage } from '@/config/config'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    isLoading: false,
    page: 1,
    length: 100
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
    get (context, page) {
      context.commit('loading')
      axios.get('https://jsonplaceholder.typicode.com/posts').then(response => {
        let start = (page - 1) * postPerPage
        let end = page * postPerPage
        context.commit('success', response.data.slice(start, end))
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
