import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import Register from '../pages/authentification/inscription/inscription.jsx'
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
import ModifRestaurant from '../pages/restaurant/gestion/modification/ModifRestaurant.jsx';
import Home from './home/Home.jsx';
import CreationProduit from './Produit/CreationProduit.jsx';
import CarteRestaurant from './restaurant/Carte/CarteRestaurant.jsx';
import CarteClient from './Client/CarteClient/CarteClient.jsx';


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
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/CreationProduit',
        element: <CreationProduit />
    },
    {
        path: '/CarteRestaurant/:id/produits',
        element: <CarteRestaurant />
    },
    {
        path: '/CarteClient/:id/table/2',
        element: <CarteClient />
    }
]);

export default router;