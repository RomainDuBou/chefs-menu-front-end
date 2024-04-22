import { useState } from "react";
import "../creation/CreationRestaurant.css";
import axiosClient from "../../../axiosClient";

export default function CreationRestaurant({ token }) {
    const [nom, setNom] = useState("");
    const [adresse, setAdresse] = useState("");
    const [horaires_ouverture, setHoraires_ouverture] = useState("");
    const [image_illustration, setImage_illustration] = useState(null);

    const creatRest = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('adresse', adresse);
        formData.append('horaires_ouverture', horaires_ouverture);
        formData.append('image_illustration', image_illustration);

        try {
            console.log("Token récupéré depuis le localStorage :", token);

            const response = axiosClient.post("/restaurants", formData, {
                withCredentials: true ,
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la création du restaurant");
            }

            const data = await response.json();
            console.log("Restaurant créé avec succès:", data);
            
        } catch (error) {
            console.error("Erreur lors de la création du restaurant:", error.message);
        }
    };

    const handleFileChange = (e) => {
        setImage_illustration(e.target.files[0]);
    };

    return (
        <div>
            <form onSubmit={creatRest}>
                <div className="creatRestContainer">
                    <h2>Création d'un restaurant</h2>
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
                        required 
                    />
                    <button type="submit">Créer le restaurant</button>
                </div>
            </form>
        </div>
    );
}
