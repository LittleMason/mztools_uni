
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import share from './utils/share.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
import share from './utils/share.js'
export function createApp() {
  const app = createSSRApp(App);
  app.mixin(share)
  return {
    app
  }
}
// #endif