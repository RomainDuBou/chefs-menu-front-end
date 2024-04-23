import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../../pages/axiosClient";
import { useStateContext } from "../../contexts/contextprovider";
import Home from "../../pages/home/Home";

export default function DefaultLayout( { children } ){
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

    useEffect(() => {
        axiosClient.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
          .then(({data}) => {
             setUser(data)
          })
      }, [token]) 

    return(
        <div id="defaultLayout">
         <div className="content">
            <header>
                <div>
                    Header
                </div>
                
            </header>
            <main>
                {Home}
            </main>
        </div>
    </div>
    )
}
