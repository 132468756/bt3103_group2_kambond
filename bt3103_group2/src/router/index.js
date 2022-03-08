import { createRouter, createWebHistory } from 'vue-router';
import Homepage from '../views/Homepage.vue'
import Borrow from '../components/Borrow.vue'
import Profile from '../views/Profile.vue'

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
    },

    {
        path: '/borrow',
        name: 'Borrow',
        component: Borrow
    },

    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    }
];

const router = new createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router