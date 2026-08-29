import {Link} from 'react-router-dom';
import {useState} from 'react';


function CreatorDetails({id,name, url, imageURL, description}){

  const [isPopup, setIsPopup] = useState(false);
  
  function deleteCreator(){

  }

  return (
    <div>
      
      <p>{name}</p>
      <img src={imageURL} alt={`creator ${name} image`} />
      <p>{description}</p>
      <p>URL: {url}</p>
      <Link to={`/creators/${id}/edit`}>Edit creator</Link>
      <button onClick={ () => {setIsPopup(true)}}>Delete</button>

      {isPopup && (
        <div>
          <p>Are you sure you want to delete this creator?</p>

          <button onClick={deleteCreator}>
            Yes
          </button>

          <button onClick={() => {setIsPopup(false)}}>
            No
          </button>
        </div>
      )}
    
    </div>
  )
}

export default CreatorDetails;