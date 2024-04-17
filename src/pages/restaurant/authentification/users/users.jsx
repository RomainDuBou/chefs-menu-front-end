export default function inscription(){
    return(
        <div>
           Users
        </div>
    )
}

















// import React, { useState } from "react";

// export default function InscriptionForm() {
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const Inscription = async (e) => {
//         e.preventDefault();

//         const response = await fetch("http://localhost:8000/api/inscription", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//             },
//             body: JSON.stringify({ name, email, password }),
//         });

//         if (response.status === 401) {
//             alert("Email ou mot de passe incorrect");
//             return;
//         };

//         if (response.status !== 200) {
//             alert("Une erreur s'est produite");
//             return;
//         }
//     };

//     return (
//         <div>
//             <h2>Inscription</h2>
//             <form onSubmit={Inscription}>
//                 <input type="text" placeholder="Nom" name="name" value={name} onChange={(e) => setName(e.target.value)} />
//                 <input type="email" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 <input type="password" placeholder="Mot de passe" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 <button type="submit">S'inscrire</button>
//             </form>
//         </div>
//     );
// }
