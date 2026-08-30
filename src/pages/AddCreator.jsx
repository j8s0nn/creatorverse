//* This page is used when people hit the Add creator at home page
import CreatorAdd from "../components/CreatorAdd";
import "./AddCreator.css"

function AddCreator(){
  return <div className="add-creator-page">
    <header className="page-header">
        <h1 className="page-title">Add your favorite creator</h1>
        <p className="page-subtitle">
          Fill in the details below to add a new content creator to your library.
        </p>
      </header>

    <main className="page-content">
        <CreatorAdd />
    </main>
    
    </div>
}

export default AddCreator;