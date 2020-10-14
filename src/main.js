import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import client from './api/client'

Vue.use(Buefy, { defaultIconPack: 'fas' })

Vue.prototype.$http = client

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
