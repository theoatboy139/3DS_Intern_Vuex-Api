import Vue from 'vue'
import Vuex from 'vuex'
import page from './page'
import post from './post'
import comment from './comment'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    pages: page,
    posts: post,
    comments: comment,
    users: user
  }
})
