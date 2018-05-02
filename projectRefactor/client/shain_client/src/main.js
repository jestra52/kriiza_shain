import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import login from './components/login.vue'
import signup from './components/signup.vue'
import main from './components/main.vue'
import index from './components/index.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/signup',
      component: signup
    },
    {
      path: '/',
      component: main
    },
    {
        path: '/index',
        component: index
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})