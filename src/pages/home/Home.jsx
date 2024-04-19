import { useEffect, useState } from "react";
import axiosClient from "../axiosClient";

export default function Home() {
    const [createdRestaurant, setCreatedRestaurant] = useState([]);
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        setAccessToken(token);

        const fetchUserRestaurants = async () => {
            try {
                const response = await axiosClient.get(`/users/${user_id}/restaurants`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des restaurants de l'utilisateur");
                }
                const data = await response.json();
                setCreatedRestaurant(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants de l'utilisateur", error.message);
            }
        };

        if (token) {
            fetchUserRestaurants();
        }
    }, []);

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
                    </li>
                ))}
            </ul>
        </div>
    );
}
