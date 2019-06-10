import { postPerPage } from '@/config/config'
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    count: 0,
    isLoading: false,
    page: 1,
    length: 0
  },
  mutations: {
    success (state, payload) {
      state.items = payload.data
      state.count = state.items.length
      state.length = payload.headers['x-total-count']
      state.isLoading = false
    },
    loading (state) {
      state.isLoading = true
    },
    add (state, post) {
      state.items = [...state.items, post]
    }
  },
  actions: {
    get (context, page) {
      context.commit('loading')
      axios.get(`http://localhost:3000/posts?_page=${page}&_limit=${postPerPage}`).then(response => {
        context.commit('success', response)
      }).catch(err => {
        console.log(err)
      })
      // axios.get('https://jsonplaceholder.typicode.com/posts?_page=3&_limit=30').then(response => {
      //   console.log(response)
      //   console.log(response.headers['x-total-count'])
      // }).catch(err => {
      //   console.log(err)
      // })
    },

    add (context, post) {
      context.commit('add', post)
    }
  }
}
