import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/restaurant/authentification/connexion/connexion.jsx';
import Register from '../pages/restaurant/authentification/inscription/inscription.jsx'
import DefaultLayout from '../composants/defaultLayout.jsx'
import GuestLayout from '../composants/guestLayout.jsx'
import Users from '../pages/restaurant/authentification/users/users.jsx';
// import UserForm from './views/UserForm.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '/users',
                element: <Users />,
            },
            {
                path: '/users/new',
                // element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                // element: <UserForm key="userUpdate" />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/register',
                element:  <Register />,
            }
        ]
    },
]);

export default router;