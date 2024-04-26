import Header from "../../../composants/header/Header";
import axiosClient from "../../axiosClient";
import BoutonRetour from "../../../composants/boutonRetour/BoutonRetour";
import "./CarteRestaurant.css";

import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import { Link } from "react-router-dom";
import QrCodeGenerator from "../../../composants/QRcode/QrCodeGenerator";


function CarteRestaurant() {
  const [produits, setProduits] = useState([]);
  const [restaurantNom, setRestaurantNom] = useState("");
  const { id } = useParams(); 
  const navigate = useNavigate();
  

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

    const fetchRestaurant = async () => {
      try {
        const response = await axiosClient.get(`restaurants/${id}`, {
          withCredentials: true,
        });
        if (response.status !== 200) {
          throw new Error ("Erreur lors de la recupération des détails du restaurants.")
        }
        const restaurantData = await response.data;
        if (restaurantData.length > 0) {
          if (restaurantData[1]) {
            const nomRestaurant = restaurantData[1];
            setRestaurantNom(nomRestaurant.nom)
          } else {
            const nomRestaurant = restaurantData[0];
            setRestaurantNom(nomRestaurant.nom)
          }
          
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduits();
    fetchRestaurant();
  }, [id]); 

  const produitsTries = produits.reduce((acc, produit) => {
    acc[produit.categorie] = acc[produit.categorie] || [];
    acc[produit.categorie].push(produit);
    return acc;
  }, {});

  function deleteButton(id) {
    const deleteProduct = async (produitId) => {
        try {
            const response = await axiosClient.delete(`/produits/${produitId}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                setProduits(prevProduct => prevProduct.filter(produit => produit.id !== produitId));

            }
        } catch (error) {
            console.error("Erreur lors de la suppression du produit de l'utilisateur");
        }
    }
    deleteProduct(id);
}
  return (
    <div>
      <Header/>
      <main className="containerCarte">
        <h1>Carte - {restaurantNom}</h1>
        <div className="underlineCarte"></div>
        <div className="enteteBtn">
          <Link to="/CreationProduit"><button className="btn">Ajouter un produit</button></Link>
          <BoutonRetour/>
        </div>
        {Object.entries(produitsTries).map(([categorie, produitsCategorie]) => (
          <div className="menu">
            <div key={categorie}>
              <h2 className="menu-group-heading">{categorie}</h2>
              <div className="menu-group">
                {produitsCategorie.map((produit) => (
                  <div className="menu-item">
                    <div className="menu-item-text">
                      <p key={produit.id}>
                        <h3 className="menu-item-heading">
                          <span className="menu-item-name">{produit.nom}</span>
                          <span className="menu-item-name">{produit.prix_TTC} € </span>
                        </h3>
                        <p className="menu-item-desc">
                          {produit.description}
                        </p>
                      </p>
                      <button onClick={() => deleteButton(produit.id)} className="btn" id="carteBtn">Supprimer</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </main>
      {/* <QrCodeGenerator/> */}
    </div>
  );
}

export default CarteRestaurant;