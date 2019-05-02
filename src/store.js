import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thesis: null,
    chapters: null,
    currentSubchapters: null,
    refs: null,
    referenceOpen: null,
    refCoordinates: []
  },
  mutations: {
    writeThesis(state, data) {
      state.thesis = data
      state.chapters = data.chapters
    },
    writeSubchapters(state, data) {
      state.currentSubchapters = data
    },
    clearSubchapters(state) {
      state.currentSubchapters = null
    },
    writeRefs(state, data) {
      state.refs = data
    },
    writeRefStatus(state, data) {
      state.referenceOpen = data.open
    },
    addRefCoordinates(state, data) {
      state.refCoordinates.push(data)
    },
    clearRefCoordinates(state) {
      state.refCoordinates = []
    }
  },
  actions: {
    setThesis(context, data) {
      context.commit('writeThesis', {
        ...data
      })
    },
    setSubchapters(context, data) {
      context.commit('writeSubchapters', {
        ...data
      })
    },
    clearSubchapters(context) {
      context.commit('clearSubchapters')
    },
    setRefs(context,data) {
      context.commit('writeRefs', {
        ...data
      })
    },
    setRefStatus(context, data) {
      context.commit('writeRefStatus', {
        open: data.open
      })
    },
    registerRefCoordinates(context, data) {
      context.commit('addRefCoordinates', {
        y1: data.y1,
        y2: data.y2,
        height: data.height
      })
    },
    clearRefCoordinates(context) {
      context.commit('clearRefCoordinates')
    }
  }
})
