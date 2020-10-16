import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register'
import Setting from '../views/Setting'

import Admin from '@/views/admin/Admin'
import AdminHome from "@/views/admin/AdminHome";
import TenantInfo from "@/views/admin/TenantInfo";
import Members from "@/views/admin/Members";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting
  },
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: '',
        name: 'admin-home',
        component: AdminHome
      },
      {
        path: 'tenant/:id',
        name: 'admin-tenant',
        component: TenantInfo,
        props: (route) => {
          const id = Number.parseInt(route.params.id, 10)
          if (Number.isNaN(id)) {
            return 0
          }
          return {id}
        }
      },
      {
        path: 'members',
        name: 'admin-members',
        component: Members
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next('/login')
      return
    }
  }
  next()
})

export default router
