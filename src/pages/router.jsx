import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import DefaultLayout from '../composants/layouts/defaultLayout.jsx'
import GuestLayout from '../composants/layouts/guestLayout.jsx'
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
import ModifRestaurant from '../pages/restaurant/gestion/modification/ModifRestaurant.jsx';


const router = createBrowserRouter ([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [ 
            {
                path: '/CreationRestaurant',
                element: <CreationRestaurant/>
            },
            {
                path: '/ModifRestaurant/:id',
                element: <ModifRestaurant/>
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