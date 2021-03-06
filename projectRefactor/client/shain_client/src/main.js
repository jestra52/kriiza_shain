import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import login from './components/login.vue'
import signup from './components/signup.vue'
import main from './components/main.vue'
import transaction from './components/transaction.vue'
import userinfo from './components/userinfo.vue'
//import bootstrap from 'bootstrap/scss/bootstrap.scss'

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
            path: '/transaction',
            component: transaction
        },
        {
            path: '/userinfo',
            component: userinfo
        },
        {
            path: '/',
            component: main
        },

    ]
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
