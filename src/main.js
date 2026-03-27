//import "@/mock"
import Vue from 'vue'
import App from './App.vue'
import "@/styles/global.less"
import router from './router'
import store from "./store"
import "./eventBus"
//自定义指令
import vLoading from "@/directives/loading.js"
import vLazy from "./directives/lazy";
Vue.directive("loading", vLoading)
Vue.directive("lazy", vLazy);

//仓库全局设置
store.dispatch("setting/fetchSetting");


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')




 







