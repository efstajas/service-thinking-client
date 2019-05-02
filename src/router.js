import Vue from 'vue'
import Router from 'vue-router'
import Cover from './views/Cover'
import store from './store'
import getThesis from '@/util/getThesis'
import getBib from '@/util/getBib'
import {parseBibFile} from "bibtex"
import { parse } from 'ipaddr.js';

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
      store.dispatch('setThesis', {
        ...thesis.data
      })
      getBib().then((bib) => {
        let refs = {}
        let parsed = parseBibFile(bib.data)
        Object.keys(parsed.entries$).forEach((entryName, i) => {
          let toPush = {
            index: i+1,
            meta: {}
          }
          Object.keys(parsed.entries$[entryName].fields).forEach((fieldName) => {
            toPush.meta[fieldName] = parsed.entries$[entryName].fields[fieldName].data.join('')
          })
          refs[`@${entryName}`] = toPush
        })
        store.dispatch('setRefs', refs)
        next()
      })
    })
  }
})

export default router