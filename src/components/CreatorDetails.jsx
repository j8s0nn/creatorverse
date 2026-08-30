import {Link, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import { supabase } from '../client';
import "./CreatorDetails.css"

function CreatorDetails({id,name, url, imageURL, description}){

  const [isPopup, setIsPopup] = useState(false);

  const navigate = useNavigate();

  const getValidUrl = (urlString) => {
    if (!urlString || typeof urlString !== "string") return null;
    
    // Trim whitespace
    const trimmed = urlString.trim();
    
    // Ensure string has http:// or https:// prefix
    const formatted = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

    try {
      // Native URL constructor throws an error if string is not a valid URL structure
      const parsed = new URL(formatted);
      
      // Check for a valid hostname with a domain extension (e.g., example.com)
      if (parsed.hostname.includes(".")) {
        return parsed.href;
      }
      return null;
    } catch (error) {
      alert("Cannot find your url");
      return;
    }
  };
    
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

  const validURL = getValidUrl(url);

  return (
  <div className="creator-details-container">
      
    <div className="creator-details-card">

      <div className="creator-details-img-container">
        <img src={imageURL} alt={`creator ${name} image`} className="creator-details-img" />
      </div>

      <div className='creator-details-content'>
        <h1 className='creator-details-name'>{name}</h1>

        <p className='creator-details-description'>{description}</p>

        {validURL ? (
          <a href={validURL} className="creator-details-url" target="_blank" 
          rel="noopener noreferrer">
            🔗 Creator's URL
          </a>
        ) : url ? (
          <span className="creator-details-url-invalid" title="Invalid URL provided">
            ⚠️ Invalid Link ({url})
          </span>
        ) : null}

      </div>
      


     


  
      <div className='creator-details-actions'>
      
      <Link className="edit-button" to={`/creators/${id}/edit`}>Edit creator</Link>
      <button className="delete-button" onClick={ () => {setIsPopup(true)}}>Delete</button>

      {isPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p className="popup-title">Are you sure you want to delete this creator?</p>

            <div className="popup-buttons">
              <button onClick={deleteCreator}>
                Yes
              </button>

              <button onClick={() => setIsPopup(false)}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    
        
      
      </div>
    </div>
  </div>
  )
  }


export default CreatorDetails;