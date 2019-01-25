import Vue from 'vue'
import './packages'
import store from './store'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'
App.store = store

const app = new Vue(App)
app.$mount()
