
import {Link} from "react-router-dom"

function CreatorCard({id,name, imageURL}){
  console.log(imageURL);
  return(
    <div>
      <img src={imageURL} alt={`${name} image`} />
      <p>{name}</p>

      <Link to={`creators/${id}`}>View more details</Link>
    </div>

  )
}

export default CreatorCard;