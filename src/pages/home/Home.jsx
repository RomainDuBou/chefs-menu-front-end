import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "../home/Home.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Home({ token }) {
    const [createdRestaurant, setCreatedRestaurant] = useState([]);

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

    function deleteButton(id) {
        const deleteRestaurant = async (restaurantId) => {
            try {
                const response = await axiosClient.delete(`/restaurants/${restaurantId}`, {
                    withCredentials: true,
                });
                if (response.status === 200) {
                    setCreatedRestaurant(prevState => prevState.filter(restaurant => restaurant.id !== restaurantId));

                }
            } catch (error) {
                console.error("Erreur lors de la suppression du restaurant de l'utilisateur");
            }
        }
        deleteRestaurant(id);
    }

    return (
        <div className="homeContainer">
            <h1>Page d'accueil</h1>
            <h2>Restaurants de l'utilisateur :</h2>
            <Link to="/CreationRestaurant"><button>Créer un restaurant</button></Link>
            <div className="restaurantContainer">
                {createdRestaurant.map((restaurant) => (
                    <div key={restaurant.id}>
                        <h3>{restaurant.nom}</h3>
                        <p>{restaurant.adresse}</p>
                        <p>{restaurant.horaires_ouverture}</p>
                        <img src={restaurant.image_illustration} alt="image d'illustration du restaurant" />
                    <div className="buttonContainer">
                        <Link to={"/ModifRestaurant/" + restaurant.id}><button>Modifier</button></Link>
                        <button onClick={() => deleteButton(restaurant.id)}>Supprimer</button>
                    </div>
                    </div> 
                ))}
                </div>
        </div>
    );
}
