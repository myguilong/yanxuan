import Vue from 'vue'
import App from './App'
//全局处理重复页面跳转详情初始化,和详情跳转详情返回的bug
import MyPlugun from './minmins'
Vue.use(MyPlugun)
import store from './store/index'
//将store挂载到全局
Vue.prototype.$store=store
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
