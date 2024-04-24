import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "../home/Home.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import { Navigate } from "react-router-dom";
import Header from "../../composants/header/Header";

export default function Home() {

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
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
                <Header/>
                <div className="entete">
                    <h2>Vos Restaurant</h2>
                    <div className="underlineHome"></div>
                    <div className="enteteBtn">
                        <Link to="/CreationRestaurant"><button className="btn">Créer un restaurant</button></Link>
                        <Link to="/CreationProduit"><button className="btn">Ajouter un produit</button></Link>
                    </div>
                </div>
                <div className="restaurantContainer">
                    {createdRestaurant.map((restaurant) => (
                        <div key={restaurant.id} className="fiche">
                        <img src={`http://localhost:8000/${restaurant.image_illustration}`} alt="Image d'illustration du restaurant" />
                            <div>
                                <h3>{restaurant.nom}</h3>
                                <p>Adresse : {restaurant.adresse}</p>
                                <p>horaires : {restaurant.horaires_ouverture}</p>
                            <div className="buttonContainer">
                                <Link to={"/ModificationRestaurant/" + restaurant.id}><button className="btn">Modifier</button></Link>
                                <button onClick={() => deleteButton(restaurant.id)} className="btn">Supprimer</button>
                                <Link to={`/CarteRestaurant/${restaurant.id}/produits`}><button className="btn">Voir la carte</button></Link>
                            </div>
                        </div>
                        </div> 
                    ))}
                    </div>
            </div>
    );
}
