import Vue from 'vue'
import Router from 'vue-router'
import Cover from './views/Cover'
import store from './store'
import getThesis from '@/util/getThesis'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cover',
      component: Cover
    },
    {
      path: '/chapter/:slug',
      name: 'chapter',
      component: () => import(/* webpackChunkName: "chapter" */ './views/Chapter/'),
    }
  ],
})

router.beforeEach((to, from, next) => {
  if (store.state.thesis) {
    next()
  } else {
    getThesis().then((res) => {
      store.dispatch('setThesis', {
        ...res.data
      })
      next()
    })
  }
})

export default router