import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import DefaultLayout from '../composants/defaultLayout.jsx'
import GuestLayout from '../composants/guestLayout.jsx'
import Users from '../pages/authentification/users/users.jsx';
// import UserForm from './views/UserForm.jsx';

const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />
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