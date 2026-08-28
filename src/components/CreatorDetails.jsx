import {Link} from 'react-router-dom';


function CreatorDetails({id,name, url, imageURL, description}){
  return (
    <div>
      
      <p>{name}</p>
      <img src={imageURL} alt={`creator ${name} image`} />
      <p>{description}</p>
      <p>URL: {url}</p>
      <Link to={`/creators/${id}/edit`}>Edit creator</Link>
    </div>
  )
}

export default CreatorDetails;