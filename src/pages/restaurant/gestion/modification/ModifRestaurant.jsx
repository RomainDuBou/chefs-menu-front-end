import React, { useState, useEffect } from "react";
import axiosClient from "../../../axiosClient";
import "../modification/ModifRestaurant.css";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../../composants/header/Header";

export default function ModificationRestaurant() {
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [horaires_ouverture, setHoraires_ouverture] = useState("");
    const [image_illustration, setImage_illustration] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams(); 

    useEffect(() => {
        async function fetchRestaurant() {
            try {
                const response = await axiosClient.get(`/restaurants/${id}`, {
                    withCredentials: true,
                });
                if (!response.ok) {
                    throw new Error("Erreur lors de la récupération des données du restaurant");
                }
                const restaurantData = await response.json();
                setNom(restaurantData.nom);
                setAdresse(restaurantData.adresse);
                setHoraires_ouverture(restaurantData.horaires_ouverture);
                setImage_illustration(restaurantData.image_illustration);
            } catch (error) {
                console.error("Erreur lors de la récupération des données du restaurant:", error.message);
            }
        }

        fetchRestaurant();
    }, [id]);

    const modify = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('adresse', adresse);
        formData.append('horaires_ouverture', horaires_ouverture);
        formData.append('image_illustration', image_illustration);
        formData.append('_method','PUT');

        try {
            const response = await axiosClient.post(`/restaurants/${id}`, formData, {
                headers: 'authorization/json',
                withCredentials: true,
            });
            if (response.status === 200) {
                alert("Restaurant modifié avec succés !")
                navigate("/");
            } else {
                throw new Error("Erreur lors de la modification du restaurant");
            }
        } catch (error) {
            console.error("Erreur lors de la modification du restaurant:", error.message);
        }
    };

    const handleFileChange = (e) => {
        setImage_illustration(e.target.files[0]);
    };


    return (
        <div>
            <Header/>
            <form onSubmit={modify}>
                <div className="modifyRestContainer">
                    <h2>Modification du restaurant</h2>
                    <div className="underline"></div>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Nom du restaurant"
                        required
                    />
                    <input
                        type="text"
                        value={adresse}
                        onChange={(e) => setAdresse(e.target.value)}
                        placeholder="Adresse"
                        required
                    />
                    <input
                        type="text"
                        value={horaires_ouverture}
                        onChange={(e) => setHoraires_ouverture(e.target.value)}
                        placeholder="Horaires"
                        required
                    />
                    <input
                        type="file" 
                        onChange={handleFileChange}
                    />
                    <button type="submit" className="btn">Modifier le restaurant</button>
                </div>
            </form>
        </div>
    );
}
