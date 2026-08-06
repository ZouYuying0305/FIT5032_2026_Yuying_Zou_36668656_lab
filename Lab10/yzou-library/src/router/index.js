import { createRouter, createWebHistory } from 'vue-router'
import { authState } from '../auth'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import AboutView from '../views/AboutView.vue'
import AccessDeniedView from '../views/AccessDeniedView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseLogoutView from '../views/FirebaseLogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import CloudBookFunctionView from '../views/CloudBookFunctionView.vue'
import WeatherView from '../views/WeatherView.vue'
import CountBookAPI from '../views/CountBookAPI.vue'
import GetAllBookAPIView from '../views/GetAllBookAPIView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: FirebaseSigninView,
  },
  {
    path: '/fire-register',
    name: 'firebase-register',
    component: FirebaseRegisterView,
  },
  {
    path: '/fire-signin',
    name: 'firebase-signin',
    component: FirebaseSigninView,
  },
  {
    path: '/fire-logout',
    name: 'firebase-logout',
    component: FirebaseLogoutView,
  },
  {
    path: '/add-book',
    name: 'add-book',
    component: AddBookView,
  },
  {
    path: '/cloud-books',
    name: 'cloud-books',
    component: CloudBookFunctionView,
  },
  {
    path: '/WeatherCheck',
    name: 'weather-check',
    component: WeatherView,
  },
  {
    path: '/CountBookAPI',
    name: 'count-book-api',
    component: CountBookAPI,
  },
  {
    path: '/GetAllBookAPI',
    name: 'get-all-book-api',
    component: GetAllBookAPIView,
  },
  {
    path: '/access-denied',
    name: 'access-denied',
    component: AccessDeniedView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authState.isAuthenticated) {
    return {
      name: 'access-denied',
      query: {
        redirect: to.fullPath,
      },
    }
  }

  return true
})

export default router
