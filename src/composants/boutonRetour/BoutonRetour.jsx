import "../boutonRetour/BoutonRetour.css";

import { useNavigate } from "react-router-dom"

export default function BoutonRetour() {

    const navigate = useNavigate();

    return (
        <div className="returnContainer">
            <button onClick={() => navigate(-1)} className="btn">←</button>
        </div>
    )
}