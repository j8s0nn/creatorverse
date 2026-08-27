//* This page is used for showing the detailed inspection of a creator.

import { useParams } from "react-router-dom";
import { supabase } from "../client";
import {useState, useEffect} from "react";
import CreatorDetails from "../components/CreatorDetails";







function ViewCreator(){
  const [creators, setCreator] = useState([]);


    async function getCreator(id){
    const {data, error} = await supabase.from("creators").select("*").eq("id", id);

    if(error){
      console.error(error);
      return;
    }

    console.log(data);
    setCreator(data);
    return;
  }

  const {id} = useParams();

  
  useEffect( () => {
    getCreator(id);
  }, [id]);

  if(creators.length == 0){
    return <h2>Cannot find your creator.</h2>
  }

  return (<div>
    <h1>View Creator {id}</h1>
    {
    
    creators.map( (creator) => {
      return <CreatorDetails 
      name={creator.name}
      description={creator.description}
      url={creator.url}
      imageURL={creator.imageURL}
      />
    })}
  </div>)
  
}

export default ViewCreator;