import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../../contexts/contextprovider";
import { redirect } from "react-router-dom";

export default function login() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { setUser, setToken } = useStateContext();

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
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          console.log(response.data.errors);
        }
      });

  };
  return (
    <div className="login-signup-form animated fadeinDown">
      <div className="form">
        <h1 className="title">Se Connecter</h1>
        <form onSubmit={Submit}>
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Connexion</button>
          <p className="message">
            Pas encore de compte?{" "}
            <Link to="/register">Créer un nouveau compte</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
