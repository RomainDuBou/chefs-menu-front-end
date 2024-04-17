import "../home/Home.css";
import { useEffect, useState } from "react";

export default function Home() {

    const [createdRestaurant, setCreatedRestaurant] = useState([]);

    useEffect(() => {
        const fetchUserRestaurants = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/users/5/restaurants");
                if (!response.ok) {
                    throw new Error("Erreur lors de la recuperation des restaurants de l'utilisateur");
                }
                const data = await response.json();
                setCreatedRestaurant(data);
            } catch (error) {
                console.error("Erreur lors de la recuperation des restaurants de l'utilisateur", error.message);
            }
        };

        fetchUserRestaurants();
    }, []);

    return (
        <div className="homeContainer">
            <h1>Page d'accueil</h1>
            <h2>Restaurants de l'utilisateur:</h2>
            <ul>
                {restaurants.map((restaurant) => (
                    <li key={restaurant.id}>
                        <h3>{restaurant.nom}</h3>
                        <p>{restaurant.adresse}</p>
                        {/* Ajoutez d'autres informations sur le restaurant si nécessaire */}
                    </li>
                ))}
                </ul>
        </div>
    );
}