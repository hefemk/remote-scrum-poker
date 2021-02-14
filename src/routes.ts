import Login from './components/Login.vue';
import Lobby from './components/Lobby.vue';
import PokerTable from './components/PokerTable.vue';

export const routes = [
    { path: '/', component: Login },
    { path: '/login', component: Login },
    { path: '/lobby', component: Lobby },
    { path: '/table/:id', component: PokerTable },
];
