import {createBrowserRouter} from 'react-router-dom';
import Login from '../pages/authentification/connexion/connexion.jsx';
import CreationRestaurant from '../pages/restaurant/gestion/creation/CreationRestaurant.jsx';
import ModifRestaurant from '../pages/restaurant/gestion/modification/ModifRestaurant.jsx';
import Home from './home/Home.jsx';
import CreationProduit from './Produit/CreationProduit.jsx';
import CarteRestaurant from './restaurant/Carte/CarteRestaurant.jsx';


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
        path: '/CreationProduit',
        element: <CreationProduit />
    },
    {
        path: 'CarteRestaurant/:id/produits',
        element: <CarteRestaurant />
    }
]);

export default router;