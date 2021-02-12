import LoginComponent from './components/Login.vue';
import HandCardsComponent from './components/HandCards.vue';

export const routes = [
    { path: '/', component: LoginComponent },
    { path: '/login', component: LoginComponent },
    { path: '/table', component: HandCardsComponent },
];
