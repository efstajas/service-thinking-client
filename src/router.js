import Vue from 'vue'
import Router from 'vue-router'
import Cover from './views/Cover'
import store from './store'
import getThesis from '@/util/getThesis'
import getRefs from '@/util/getRefs'

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
    },
    {
      path: '/sources',
      name: 'sources',
      component: () => import(/* webpackChunkName: "sources" */ './views/Sources/'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (store.state.thesis && store.state.refs) {
    next()
  } else {
    getThesis().then((thesis) => {
      getRefs().then((refs) => {
        store.dispatch('setThesis', {
          ...thesis.data
        }),
        store.dispatch('setRefs', {
          ...refs.data
        })
        next()
      })
    })
  }
})

export default router