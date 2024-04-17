import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/contextprovider";

export default function Defaultlayout() {
  const { user, token } = useStateContext();
  if (!token) {
    return <Navigate to="/connexion" />;
  }
  return (
    <div id="defaultLayout">
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            {/* <a href="#" onClick={onLogout} className="btn btn-logout"></a> */}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
