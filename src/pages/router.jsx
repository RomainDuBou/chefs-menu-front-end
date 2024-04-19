import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import DefaultLayout from '../composants/defaultLayout.jsx'
import GuestLayout from '../composants/guestLayout.jsx'
import Users from '../pages/authentification/users/users.jsx';
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
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
            {
                path: '/CreationRestaurant',
                element: <CreationRestaurant/>
            }
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