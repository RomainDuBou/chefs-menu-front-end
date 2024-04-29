import { useRef } from "react";
import { Link } from "react-router-dom"; // Ajout de Navigate
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../../contexts/contextprovider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./connexion.css"

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const [resetError, setResetError] = useState("");

  const handleResetPassword = (ev) => {
    ev.preventDefault();
    const email = emailRef.current.value;
    axiosClient
      .post("/check-email", { email }) // Endpoint fictif pour vérifier l'e-mail
      .then((response) => {
        if (response.data.exists) {
          navigate(`/reset-password?email=${email}`);
        } else {
          setResetError("Aucune adresse e-mail trouvée.");
        }
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 401) {
          setResetError(response.data.error); // Afficher le message d'erreur dans le state
        } else {
          console.error("Erreur lors de la connexion :", err);
          setResetError("Une erreur s'est produite. Veuillez réessayer.");
        }
      });
  };

  const Submit = (ev) => {
    ev.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem("USER_ID", data.user.id);
        navigate("/");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.data && response.data.error) {
          setResetError(response.data.error); // Afficher le message d'erreur renvoyé par le backend
        } else {
          console.error("Erreur lors de la connexion :", err);
          setResetError("Une erreur s'est produite. Veuillez réessayer.");
        }
      });
  };
  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Se Connecter</h1>
        <div className="error-message">{resetError}</div> 
        <form onSubmit={Submit}>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Connexion</button>
          <button className="resetBtn" onClick={handleResetPassword}>Mot de passe oublié ?</button>
          <p className="message">
            Pas encore de compte? <br />
            <Link to="/register">Créer un nouveau compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
