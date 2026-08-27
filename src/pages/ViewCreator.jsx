//* This page is used for showing the detailed inspection of a creator.

import { useParams } from "react-router-dom";


function ViewCreator(){
  const {id} = useParams();

  return <h1>View Creator {id}</h1>
}

export default ViewCreator;