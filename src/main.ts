import { createApp } from 'vue'
import * as VueRouter from 'vue-router';
import App from './App.vue'
import { routes } from './routes';
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

import firebaseConfig from '../firebase-config.json';
firebase.initializeApp(firebaseConfig);

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app');
