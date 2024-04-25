import React, { useState, useEffect } from "react";
import axiosClient from "../../axiosClient";
import { useParams } from "react-router-dom";
import Header from "../../../composants/header/Header";
import "./CarteRestaurant.css";
import { Link } from "react-router-dom";
import QRCode from "qrcode.react"; // Importez le composant QRCode

function CarteRestaurant() {
  const [produits, setProduits] = useState([]);
  const { id } = useParams();

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
  }, [id]);

  // Définir l'ordre des catégories
  const categoriesOrder = ["entree", "plats", "desserts", "boissons"];

  // Triez les catégories et les produits par catégorie dans l'ordre spécifié
  const categories = categoriesOrder.filter((category) =>
    produits.some((produit) => produit.categorie === category)
  );
  const produitsTries = produits.reduce((acc, produit) => {
    acc[produit.categorie] = acc[produit.categorie] || [];
    acc[produit.categorie].push(produit);
    return acc;
  }, {});

  return (
    <div>
      <Header />
      <main className="containerCarte">
        <h1 className="carteHeading">La Carte</h1>
        {produits.length === 0 ? (
          <p className="nocarteP">
            Aucun produit n'a été ajouté à la carte de ce restaurant.
            Souhaitez-vous y remédier ?{" "}
            <Link to="/CreationProduit">
              <button className="btn">Ajouter un produit</button>
            </Link>
          </p>
        ) : (
          categories.map((categorie) => (
            <div className="menu" key={categorie}>
              <h2 className="menu-group-heading">{categorie}</h2>
              <div className="menu-group">
                {produitsTries[categorie].map((produit) => (
                  <div className="menu-item" key={produit.id}>
                    <img
                      src="https://dummyimage.com/600x400/000/fff"
                      alt="Black Placeholder Image"
                      className="menu-item-img"
                    />
                    <div className="menu-item-text">
                      <h3 className="menu-item-heading">
                        <span className="menu-item-name">{produit.nom}</span>
                        <span className="menu-item-name">
                          {produit.prix_TTC} €{" "}
                        </span>
                      </h3>
                      <p className="menu-item-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Perferendis, voluptatem?
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        {/* Générer un QR Code unique pour chaque carte */}
        {produits.map((produit) => (
          <QRCode
            key={produit.id}
            value={`https://votre-site.com/carte/${id}/${produit.id}`}
          />
        ))}
      </main>
    </div>
  );
}

export default CarteRestaurant;
