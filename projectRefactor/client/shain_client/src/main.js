import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import login from './components/login.vue'
import signup from './components/signup.vue'

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      component: login
    },
    {
      path: '/signup',
      component: signup
    }
  ]
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
