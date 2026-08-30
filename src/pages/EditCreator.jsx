//* This page is used for edit information content
import { useParams } from "react-router-dom";
import CreatorEdit from "../components/CreatorEdit";


function EditCreator(){
  const {id} = useParams();

  return <div className="add-creator-page">
    <header className="page-header">
        <h1 className="page-title">Edit your creator</h1>
        <p className="page-subtitle">
          Fill in the details below to edit your creatory.
        </p>
      </header>

      <main className="page-content">
         <CreatorEdit id={id}></CreatorEdit>
      </main>
   
  </div> 
}

export default EditCreator;