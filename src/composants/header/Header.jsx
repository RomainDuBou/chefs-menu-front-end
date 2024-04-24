import { Navigate } from "react-router-dom";
import axiosClient from "../../pages/axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/contextprovider";
import "../header/Header.css"

export default function Header() {

    const {user, token, setUser, setToken} = useStateContext();
    if(!token){
       return <Navigate to='/login'/>
    }
    
    const onLogout =  (ev) =>{
        ev.preventDefault();
        axiosClient.get('/logout')
        .then(({}) => {
           setUser(null)
           setToken(null)
        })
    }
    return (
        <header>
            <div className="headerContainer">
                <Link to="/"><button className="btn">Home</button></Link>
                <a href="#" onClick={onLogout} className="btn-logout"> Logout</a>
            </div>
        </header>
    )
}