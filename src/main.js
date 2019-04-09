import Vue from 'vue'
import App from './App.vue'
// 追加ここから ---
import firebase from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: "AIzaSyAsbEOjgm12wwwMFHg-V6KqmYXtd6YxLUY",
  authDomain: "fb-auth-test-1111.firebaseapp.com",
  databaseURL: "https://fb-auth-test-1111.firebaseio.com",
  projectId: "fb-auth-test-1111",
  storageBucket: "fb-auth-test-1111.appspot.com",
  messagingSenderId: "693208013602"
};
firebase.initializeApp(config);
// 追加ここまで ---

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
