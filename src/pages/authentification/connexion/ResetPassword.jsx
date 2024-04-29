import { useRef, useState } from "react";
import axiosClient from "../../axiosClient";

export default function ResetPassword() {
  const newPasswordRef = useRef();
  const [resetError, setResetError] = useState(""); // État pour stocker les erreurs de réinitialisation
  const [resetSuccess, setResetSuccess] = useState(false); // État pour indiquer si la réinitialisation a réussi
  const email = new URLSearchParams(location.search).get("email");

  const handleChangePassword = (ev) => {
    ev.preventDefault();
    const newPassword = newPasswordRef.current.value;

    // Envoyer une requête au serveur pour changer le mot de passe
    axiosClient
      .post("/reset-password", { email, newPassword })
      .then((response) => {
        setResetSuccess(true);
      })
      .catch((error) => {
        setResetError("Une erreur s'est produite lors du changement du mot de passe. Veuillez réessayer.");
      });
  };

  return (
    <div className="reset-password-form">
      <h1>Modifier le mot de passe</h1>
      <p>Vous modifiez le mot de passe pour l'adresse e-mail : {email}</p>
      {resetError && <p className="error-message">{resetError}</p>}
      {resetSuccess && <p className="success-message">Le mot de passe a été modifié avec succès.</p>}
      <form onSubmit={handleChangePassword}>
        <input ref={newPasswordRef} type="password" placeholder="Nouveau mot de passe" />
        <button type="submit">Modifier le mot de passe</button>
      </form>
    </div>
  );
}
