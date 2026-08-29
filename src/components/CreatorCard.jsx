
import {Link} from "react-router-dom"
import "./CreatorCard.css";


function CreatorCard({id,name, imageURL}){
  console.log(imageURL);
  return(
    <div className="creator-card-main">
      <img className="creator-card-img" src={imageURL} alt={`${name} image`} />
      <p className="creator-card-name">{name}</p>

      <Link className="view-more-details-button" to={`creators/${id}`}>View more details</Link>
    </div>

  )
}

export default CreatorCard;