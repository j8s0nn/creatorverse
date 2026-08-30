//* This page can serve as the home page, where all the creators are displayed.

import CreatorCard from "../components/CreatorCard";
import { supabase } from "../client";
import {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import "./Home.css"

function Home(){

  const [creators, setCreator] = useState([]);

  async function fetchCreators(){
    const {data, error} = await supabase.from("creators").select("*");

    if(error){
      alert("Cannot get all creators");

      return;
    }

    setCreator(data);
  }


  useEffect(() => {
    fetchCreators()
  }, []);


  return <div>

  <div className="home-container">
    <div className="header-container">
        <div className="header-info">
          <h1>My favorite Creators</h1>
          <h2>Discover and keep track of your creators</h2>
        </div>
      
      <Link className="add-creator-button" to="creators/new">Add your creator</Link>

    </div>
    <div className="creators-container">
      {creators.length === 0 
        ? <div className="empty-state-home">
            <p>No creators yet! Add your favorite creator</p>
          </div>
        :creators.map( (creator) => {
          return (
            <CreatorCard 
              key={creator.id}
              id={creator.id}
              name={creator.name}
              imageURL={creator.imageURL}       
            />
          )
        } )   
      }

    </div>

  </div>
  
    

    

  </div>
}

export default Home;