// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import './assets/css/custom.css'

import { store } from './store'
import firebase from 'firebase'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */

firebase.initializeApp({
  apiKey: 'AIzaSyBZN9vi-2L3DZjTjBdbbHw0uSrPohFYybc',
  authDomain: 'testproyect-95.firebaseapp.com',
  databaseURL: 'https://testproyect-95.firebaseio.com',
  projectId: 'testproyect-95',
  storageBucket: '',
  messagingSenderId: '831547359584'
})

/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged(firebaseUser => {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created () {
      if (firebaseUser) {
        store.dispatch('autoSignIn', firebaseUser)
      }
    }
  })
  unsubscribe()
})
