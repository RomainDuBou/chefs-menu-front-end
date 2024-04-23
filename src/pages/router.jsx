import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import DefaultLayout from '../composants/layouts/defaultLayout.jsx'
import GuestLayout from '../composants/layouts/guestLayout.jsx'
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
import ModifRestaurant from '../pages/restaurant/gestion/modification/ModifRestaurant.jsx';
import Home from './home/Home.jsx';


const router = createBrowserRouter ([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/CreationRestaurant',
        element: <CreationRestaurant/>
    },
    {
       path: '/ModificationRestaurant/:id',
       element: <ModifRestaurant/>
    },
    {
        path: '/login',
        element: <Login/>
    }
]);

export default router;