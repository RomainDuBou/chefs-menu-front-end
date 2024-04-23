import React, { useEffect, useState } from "react";
import axiosClient from "../axiosClient";
import "../home/Home.css";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import { Navigate } from "react-router-dom";

export default function Home() {

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }

    useEffect(() => {
        axiosClient.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(({data}) => {
             setUser(data)
          })
      }, [token])

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
                    <div>
                        {user.name}
                        <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
                    </div>
                <h2>Vos Restaurant</h2>
                <Link to="/CreationRestaurant"><button>Créer un restaurant</button></Link>
                <div className="restaurantContainer">
                    {createdRestaurant.map((restaurant) => (
                        <div key={restaurant.id} className="fiche">
                            <img src={restaurant.image_illustration} alt="image d'illustration du restaurant" />
                            <div>
                                <h3>{restaurant.nom}</h3>
                                <p>{restaurant.adresse}</p>
                                <p>{restaurant.horaires_ouverture}</p>
                            <div className="buttonContainer">
                                <Link to={"/ModificationRestaurant/" + restaurant.id}><button id="btn">Modifier</button></Link>
                                <button onClick={() => deleteButton(restaurant.id)} id="btn">Supprimer</button>
                            </div>
                        </div>
                        </div> 
                    ))}
                    </div>
            </div>
    );
}
