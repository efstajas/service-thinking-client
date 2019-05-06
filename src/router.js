import Vue from 'vue'
import Router from 'vue-router'
import Cover from './views/Cover'
import store from './store'
import getThesis from '@/util/getThesis'
import getBib from '@/util/getBib'
import {parseBibFile} from "bibtex"

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
    {
      path: '/appendix',
      name: 'appendix',
      component: () => import(/* webpackChunkName: "appendix" */ './views/Appendix/'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  store.dispatch('clearRefCoordinates')
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
          toPush.meta.title = parsed.getEntry(entryName).getField('title').data.join('')

          if (parsed.getEntry(entryName).getField('author')) {
            if (parsed.getEntry(entryName).getField('author').data[0].type) {
              toPush.meta.author = parsed.getEntry(entryName).getField('author').data[0].data.join('')
            } else {
              toPush.meta.author = parsed.getEntry(entryName).getField('author').data.join('')
            }
          }

          Object.keys(parsed.entries$[entryName].fields).forEach((fieldName) => {
            if (fieldName !== 'title' && fieldName !== 'author') toPush.meta[fieldName] = (parsed.getEntry(entryName).getField(fieldName).data) ? parsed.getEntry(entryName).getField(fieldName).data.join('') : parsed.getEntry(entryName).getField(fieldName)
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