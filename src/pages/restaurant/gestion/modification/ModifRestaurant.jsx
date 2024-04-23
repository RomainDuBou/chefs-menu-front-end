import { useState, useEffect } from "react";
import axiosClient from "../../../axiosClient";
import "../modification/ModifRestaurant.css";
import { useParams } from "react-router-dom";

export default function ModificationRestaurant() {
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [horaires_ouverture, setHoraires_ouverture] = useState("");
    const [image_illustration, setImage_illustration] = useState(null);

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

        try {
            const response = await fetch(`http://localhost:8000/api/restaurants/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nom, adresse, horaires_ouverture, image_illustration }),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la modification du restaurant");
            }

            const data = await response.json();
            console.log("Restaurant modifié avec succès:", data);
            
        } catch (error) {
            console.error("Erreur lors de la modification du restaurant:", error.message);
        }
    };

    const handleFileChange = (e) => {
        setImage_illustration(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={modify}>
                <div className="modifyRestContainer">
                    <h2>Modification du restaurant</h2>
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
                    <button type="submit">Modifier le restaurant</button>
                </div>
            </form>
        </div>
    );
}
