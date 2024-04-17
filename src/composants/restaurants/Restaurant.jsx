import "./Restaurant.css";

export default function Restaurant(props) {

    const {nom, adresse, horaires_ouverture, image_illustration} = props;

    return (
        <div restaurantContainer>
            <img src={image_illustration} alt="image d'illustration du restaurant"/>
            <div>
                <h2>{nom}</h2>
                <p>{adresse}</p>
                <p>{horaires_ouverture}</p>
            </div>
        </div>
    )
};