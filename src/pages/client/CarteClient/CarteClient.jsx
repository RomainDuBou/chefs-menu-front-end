import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";

import "./CarteClient.css";

export default function CarteClient() {
    const [produits, setProduits] = useState([]);
    const [restaurantNom, setRestaurantNom] = useState("");
    const [quantites, setQuantites] = useState({}); 
    const { id, tableId } = useParams(); 
    
  
    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await axiosClient.get(`/restaurants/${id}/produits/`, {
                    withCredentials: true,
                });
                if (response.status !== 200) {
                    throw new Error("Erreur lors de la récupération des produits");
                }
                const data = await response.data;
                const quantitesInitiales = {};
                data.forEach((produit) => {
                    quantitesInitiales[produit.id] = 0;
                });
                setProduits(data);
                setQuantites(quantitesInitiales);
            } catch (error) {
                console.error(error);
            }
        };
    
        const fetchRestaurant = async () => {
            try {
                const response = await axiosClient.get(`restaurants/${id}`, {
                    withCredentials: true,
                });
                if (response.status !== 200) {
                    throw new Error ("Erreur lors de la récupération des détails du restaurant.")
                }
                const restaurantData = await response.data;
                if (restaurantData.length > 0) {
                    const nomRestaurant = restaurantData[0];
                    setRestaurantNom(nomRestaurant.nom);
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        fetchProduits();
        fetchRestaurant();
    }, [id, tableId]); 
    
    const produitsTries = produits.reduce((acc, produit) => {
      acc[produit.categorie] = acc[produit.categorie] || [];
      acc[produit.categorie].push(produit);
      return acc;
    }, {});

    const handleQuantiteChange = (produitId, quantite) => {
      setQuantites((prevQuantites) => ({
        ...prevQuantites,
        [produitId]: quantite,
      }));
    };

    const commanderProduits = async() => {
        try {
            const commande = {
                restaurant_id: id,
                table_id: id,
                produits: Object.keys(quantites).map(produitId => ({
                    produit_id: produitId,
                    quantite: quantites[produitId]
                }))
            };
            const response = await axiosClient.post("/restaurants/{restaurant_id}/commandes", commande);
            if (response.status === 200) {
                console.log("Commande réussie :", commande);
            }
        } catch (error) {
            console.error("Erreur lors de la commande :", error);
        }
      console.log("Produits commandés :", quantites);
    };
    
    return (
      <div>
        <main className="carteClientContainer">
          <h1>Carte - {restaurantNom}</h1>
          <div className="underlineCarte"></div>
          <div className="enteteBtn">
          </div>
          {Object.entries(produitsTries).map(([categorie, produitsCategorie]) => (
            <div className="menu">
              <div key={categorie}>
                <h2 className="menu-group-heading">{categorie}</h2>
                <div className="menu-group">
                  {produitsCategorie.map((produit) => (
                    <div className="menu-item" key={produit.id}>
                      <div className="menu-item-text">
                        <h3 className="menu-item-heading">
                          <span className="menu-item-name">{produit.nom}</span>
                          <span className="menu-item-name">{produit.prix_TTC} € </span>
                        </h3>
                        <p className="menu-item-desc">
                          {produit.description}
                        </p>
                        <input
                          type="number"
                          min="1"
                          value={quantites[produit.id]}
                          onChange={(e) => handleQuantiteChange(produit.id, parseInt(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <button className="btn" onClick={commanderProduits}>Commander</button>
        </main>
      </div>
    );
}