import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store'
import './api/mock'


//引入echarts
import * as echarts from 'echarts' //在import的后面，echarts的前面加一个 * as
//vue全局注入echarts
Vue.prototype.$echarts = echarts

Vue.use(ElementUI);

//添加全局前置路由守卫
router.beforeEach((to, from, next) => { 
  //判断token是否存在
  const token = Cookie.get('token')
  //token不存在，说明用户未登录，跳转登录页
  if (!token && to.name !== 'login') {
    next({ name:'login' })
  } else if (token && to.name === 'login') {
    next({ name:'home' })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit('addMenu',router)
  }
}).$mount('#app')
