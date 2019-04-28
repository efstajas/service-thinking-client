import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueScrollactive from 'vue-scrollactive'
import PortalVue from 'portal-vue'

Vue.config.productionTip = false
Vue.use(VueScrollactive)
Vue.use(PortalVue)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
