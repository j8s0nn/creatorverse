import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { supabase } from '../client';


function CreatorDetails({id,name, url, imageURL, description}){

  const [isPopup, setIsPopup] = useState(false);

  const navigate = useNavigate();
  
  async function deleteCreator(){
    
      const splittedURL = imageURL.split("/");

      const storagePath = `creators/${splittedURL[splittedURL.length - 1]}`;

      const { error: databaseError} = await supabase.from("creators").delete().eq("id", id);

      if(databaseError){
        alert("Cannot delete user from database");
        return;
      }


      const { error: imageError} = await supabase.storage.from("images").remove(storagePath);

      if(imageError){
        alert("Cannot delete the image");
        return
      }

      alert("Succesully remove this creator");

      //* Return to homepage after deletion.
      navigate("/")
      
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

      <Link to={`/`}>Home</Link>
    
    </div>
  )
}

export default CreatorDetails;