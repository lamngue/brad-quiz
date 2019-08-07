import React from 'react';

const Home = React.lazy(() => import("./Screens/Home/Home"))

const Login = React.lazy(() => import("./Screens/Login/Login"))

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
];

export default routes;