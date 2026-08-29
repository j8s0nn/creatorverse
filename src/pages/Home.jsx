//* This page can serve as the home page, where all the creators are displayed.

import CreatorCard from "../components/CreatorCard";
import { supabase } from "../client";
import {useEffect, useState} from "react"
function Home(){

  const [creators, setCreator] = useState([]);

  async function fetchCreators(){
    const {data, error} = await supabase.from("creators").select("*");

    if(error){
      alert("Cannot get all creators");

      return;
    }

    console.log(data);

    setCreator(data);
  }


  useEffect(() => {
    fetchCreators()
  }, []);


  return <div>
    <h1>Home</h1>

    {creators.length === 0 
      ? <p>Add your favorite creators</p>
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
}

export default Home;