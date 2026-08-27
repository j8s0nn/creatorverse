//* This page is used for edit information content

import { useParams } from "react-router-dom";

function EditCreator(){
  const {id} = useParams();

  return <h1>Edit Creator {id}</h1>
}

export default EditCreator;