import React, { useState, useEffect } from "react"; // Ajout de React
import axiosClient from "../axiosClient";
import Header from "../../composants/header/Header";
import "./CreationProduit.css"

export default function CreationProduit() {
  const [nom, setNom] = useState("");
  const [categorie, setCategorie] = useState("entree");
  const [prix_HT, setPrix_HT] = useState("");
  const [taux_TVA, setTaux_TVA] = useState("");
  const [prix_TTC, setPrix_TTC] = useState(""); // Ajout du prix TTC
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  useEffect(() => {
    const fetchUserRestaurants = async () => {
      try {
        const response = await axiosClient.get("/restaurants", {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error(
            "Erreur lors de la récupération des restaurants de l'utilisateur"
          );
        }
        const data = await response.data;
        setRestaurants(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des restaurants de l'utilisateur",
          error.message
        );
      }
    };
    fetchUserRestaurants();
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();

    // Calcul du prix TTC
    const prixTTC = parseFloat(prix_HT) * (1 + parseFloat(taux_TVA) / 100);
    setPrix_TTC(prixTTC.toFixed(2));

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("categorie", categorie);
    formData.append("prix_HT", prix_HT);
    formData.append("taux_TVA", taux_TVA);
    formData.append("prix_TTC", prixTTC); // Correction : utilisez prixTTC ici
    formData.append("restaurant_id", selectedRestaurant);

    try {
      const response = await axiosClient.post(
        `/restaurants/${selectedRestaurant}/produits`,
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.status !== 201) {
        // Correction : vérifiez le statut 201
        throw new Error("Erreur lors de la création du produit");
      }

      const data = await response.data; // Correction : pas besoin de .json() ici
      console.log("Produit créé avec succès:", data);
    } catch (error) {
      console.error("Erreur lors de la création du produit:", error.message);
    }
  };

  return (
    <div>
      <div className="content">
        <Header />
        <form onSubmit={createProduct}>
          <div className="createProductContainer">
            <h2>Ajouter un produit à la carte d'un restaurant</h2>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Nom du produit"
              required
            />
            <select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
            >
              <option value="entree">Entrée</option>
              <option value="plats">Plats</option>
              <option value="desserts">Desserts</option>
              <option value="boissons">Boissons</option>
            </select>
            <input
              type="number"
              value={prix_HT}
              onChange={(e) => setPrix_HT(e.target.value)}
              placeholder="Prix HT"
              required
            />
            <input
              type="number"
              value={taux_TVA}
              onChange={(e) => setTaux_TVA(e.target.value)}
              placeholder="Taux TVA"
              required
            />
            {/* Affichage du prix TTC */}
            <input
              type="text"
              value={prix_TTC}
              readOnly
              placeholder="Prix TTC"
            />
            <select
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              <option value="">Sélectionner un restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.nom}
                </option>
              ))}
            </select>
            <button type="submit">Créer le produit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
