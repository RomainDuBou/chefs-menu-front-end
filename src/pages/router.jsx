import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import Home from './home/Home.jsx';
import Users from '../pages/authentification/users/users.jsx';
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
import ModificationRestaurant from './restaurant/gestion/modification/ModifRestaurant.jsx';
import CreationProduit from './produit/CreationProduit.jsx';
import CarteRestaurant from './restaurant/carte/CarteRestaurant.jsx';
// import UserForm from './views/UserForm.jsx';

const router = createBrowserRouter ([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/users',
        element: <Users />,
    },
    {
        path: '/ModificationRestaurant/:id',
        element: <ModificationRestaurant/>
     },
    {
        path: '/CreationRestaurant',
        element: <CreationRestaurant />
    },
    {
        path: '/CreationProduit',
        element: <CreationProduit />
    },
    {
        path: 'CarteRestaurant/:id/produits',
        element: <CarteRestaurant />
    }
]);

export default router;