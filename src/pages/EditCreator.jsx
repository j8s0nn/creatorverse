//* This page is used for edit information content
import { useParams } from "react-router-dom";
import CreatorEdit from "../components/CreatorEdit";


function EditCreator(){
  const {id} = useParams();

  return <div>
    <h1>Edit Creator {id}</h1>
    <CreatorEdit id={id}></CreatorEdit>
  </div> 
}

export default EditCreator;