import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Home({ token }) {
    const [createdRestaurant, setCreatedRestaurant] = useState([]);
    console.log(token)
    useEffect(() => {
        const userRestaurants = async () => {
            try {
                const response = await axiosClient.get("/restaurants", {
                    withCredentials: true,
                });
                if (response.status !== 200) {
                    throw new Error("Erreur lors de la récupération des restaurants de l'utilisateur");
                }
                console.log(response);
                const data = await response.data;
                setCreatedRestaurant(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants de l'utilisateur", error.message);
            }
        };

        if (token) {
            userRestaurants();
        }

    }, [token]);

    return (
        <div className="homeContainer">
            <h1>Page d'accueil</h1>
            <h2>Restaurants de l'utilisateur :</h2>
            <ul>
                {createdRestaurant.map((restaurant) => (
                    <li key={restaurant.id}>
                        <h3>{restaurant.nom}</h3>
                        <p>{restaurant.adresse}</p>
                        <p>{restaurant.horaires_ouverture}</p>
                        <img src={restaurant.image_illustration} alt="image d'illustration du restaurant" />
                        <button>Voir la carte</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
