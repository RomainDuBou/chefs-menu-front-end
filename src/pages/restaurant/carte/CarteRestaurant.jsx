import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom"; // Importez useParams
import "./CarteRestaurant.css";

function CarteRestaurant() {
  const [produits, setProduits] = useState([]);
  const { id } = useParams(); // Utilisez useParams pour récupérer l'ID du restaurant

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
        setProduits(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduits();
  }, [id]); // Ajoutez id comme dépendance

  // Triez les produits par catégorie
  const produitsTries = produits.reduce((acc, produit) => {
    acc[produit.categorie] = acc[produit.categorie] || [];
    acc[produit.categorie].push(produit);
    return acc;
  }, {});

  return (
    <div>
      <main className="containerCarte">
        <h2>Produits du restaurant</h2>
        {Object.entries(produitsTries).map(([categorie, produitsCategorie]) => (
          <div className="menu">
            <div key={categorie}>
              <h2 className="menu-group-heading">{categorie}</h2>
              <div className="menu-group">
                {produitsCategorie.map((produit) => (
                  <div className="menu-item">
                    <img
                      src="https://dummyimage.com/600x400/000/fff"
                      alt="Black Placeholder Image"
                      class="menu-item-img"
                    />
                    <div className="menu-item-text">
                      <p key={produit.id}>
                        <h3 className="menu-item-heading">
                          <span className="menu-item-name">{produit.nom}</span>
                          <span className="menu-item-name">{produit.prix_TTC} € </span>
                        </h3>
                        <p class="menu-item-desc">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Perferendis, voluptatem?
                        </p>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default CarteRestaurant;
