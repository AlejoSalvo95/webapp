import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

const routerOptions = [
  { path: '/', component: 'Landing' },
  { path: '/helloworld', component: 'HelloWorld' },
  { path: '/contact', component: 'Contact' },
  {
    path: '/customercontact',
    component: 'CustomerContact',
    meta: { requiresAuth: true }
  },
  { path: '/createbooking', component: 'CreateBooking' },
  { path: '/signin', component: 'SignIn' },
  { path: '/signup', component: 'SignUp' },
  { path: '/home', component: 'Home', meta: { requiresAuth: true } },
  { path: '*', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/components/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
