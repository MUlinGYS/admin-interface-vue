
import Vue from "vue"
import VueRouter from 'vue-router'
import User from '../views/User.vue'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/dlIndex.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Main,
        name:'Main',
        redirect:'/home',//重定向
        children: [
            //替换成动态路由了
            // { path: '/home', name:'home', component: Home },
            // { path: '/user', name:'user', component: User },
            // { path:'/mall', name:'mall', component:Mall },
            // { path:'/page1', name:'page1', component:PageOne },
            // { path:'/page2', name:'page2', component:PageTwo },
        ]
    },
    {
        path: '/Login',
        name:"login",
        component: Login
    },
    {
    path: '/myData',
    name: 'myData',
    component: () => import('../views/myData.vue')
    }

]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router