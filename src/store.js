import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    thesis: null,
    chapters: null,
    currentSubchapters: null
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
    }
  }
})
