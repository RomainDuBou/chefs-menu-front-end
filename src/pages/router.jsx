import { createBrowserRouter } from "react-router-dom";
import Connexion from "./restaurant/authentification/connexion/connexion";
import Inscription from "./restaurant/authentification/inscription/inscription";
import DefaultLayout from "../composants/defaultLayout";
import GuestLayout from "../composants/guestLayout";
import Users from "./restaurant/authentification/users/users";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/users",
        element: <Users />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/connexion",
        element: <Connexion />,
      },
      {
        path: "/inscription",
        element: <Inscription />,
      }
    ]
  },

]);

export default router;
