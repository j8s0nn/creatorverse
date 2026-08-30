//* This page is used for showing the detailed inspection of a creator.

import { useParams, Link } from "react-router-dom";
import { supabase } from "../client";
import {useState, useEffect} from "react";
import CreatorDetails from "../components/CreatorDetails";
import "./ViewCreator.css"

function ViewCreator(){
  const [creators, setCreator] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

    async function getCreator(id){
      setIsLoading(true);
    const {data, error} = await supabase.from("creators").select("*").eq("id", id);

    if(error){
      console.error(error);
      return;
    }

    console.log(data);
    setCreator(data);
    setIsLoading(false);
    return;
  }

  const {id} = useParams();

  
  useEffect( () => {
    getCreator(id);
  }, [id]);

  if (isLoading) {
    return (
      <div className="view-creators-container">
        <div className="empty-state">
          <h2>Finding your creator...</h2>
        </div>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="view-creators-container">
        <header className="page-header">
          <Link to="/" className="back-link">← Back to Home</Link>
        </header>

        <div className="empty-state">
          <h2>Cannot find your creator.</h2>
          <p>There are currently no creators registered in your collection.</p>
          <Link to="/creators/new" className="add-creator-button">
            Add Creator
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="view-creators-container">
      
      <header className="page-header">
        <Link to="/" className="back-link">Back to Home</Link>

        <div className="header-content">
          <div>
            <h1>View your Creator</h1>
          </div>

        </div>
      </header>

      {/* Creator Cards List */}
      <div className="creator-container">
        {creators.map((creator) => (
          <CreatorDetails 
            key={creator.id} // Added key prop for React rendering
            id={creator.id}
            name={creator.name}
            description={creator.description}
            url={creator.url}
            imageURL={creator.imageURL}
          />
        ))}
      </div>
    </div>
  );
  
}

export default ViewCreator;