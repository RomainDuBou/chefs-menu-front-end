import React, { useEffect, useState } from "react";
import axiosClient from "../../pages/axiosClient";``
import { Link, Navigate } from "react-router-dom"; // Importe Navigate
import { useStateContext } from "../../contexts/contextprovider";

export default function Header() {
  const { user, token, setUser, setToken } = useStateContext(); // Supprime token

  if (!token) {
    return <Navigate to="/login" />; // Utilise Navigate au lieu de return null
  }

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient
      .get("/logout")
      .then(() => {
        setUser(null);
        setToken(null);
      })
      .catch((error) =>
        console.error("Erreur lors de la déconnexion :", error)
      );
  };

  return (
        <header>
          <div>Header</div>
          <div>
            {user.name}
            <a href="#" onClick={onLogout} className="btn-logout">
              {" "}
              Logout
            </a>
          </div>
        </header>
  );
}
