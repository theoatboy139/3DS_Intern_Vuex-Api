import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/board/page/1'
    },
    {
      path: '/board/page/:page',
      component: () => import('./views/Page.vue')
    },
    {
      path: '/board/post/:postID',
      component: () => import('./views/Post.vue')
    },
    {
      path: '/board/user/:userId',
      component: () => import('./views/User.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
