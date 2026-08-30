//* This file is used for detailed editting creator.


import {useState} from 'react';
import { supabase } from '../client';
import {Link} from "react-router-dom"
import {useEffect} from "react";

function CreatorEdit({id}){

  
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);


  async function fetchCreator() {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)

      if (error) {
        console.error('Error fetching creator:', error.message);
        alert('Could not load creator information.');
      } else if (data) {
        console.log(data[0].name);
        setName(data[0].name || '');
        setDescription(data[0].description || '');
        setUrl(data[0].url || '');
      }
      setLoading(false);
  }
  
    //* Fetch the existed data to display before edit.
  useEffect(() => {
    fetchCreator();
  },[]);



  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  }

   async function handleSubmit(e){

      if (!name.trim() || !description.trim() || !url.trim()) {
        alert("Please fill out all fields");
        return;
      }

      if (!image) {
        alert("Please select an image");
        return;
      }
      
      // Prevent default behaviour
      e.preventDefault();

      if(!image){
        alert("Please select an image");
        return;
      }

      //Prevent invalid char in the name of the image.
      const filePath = `creators/${crypto.randomUUID()}.png`;

      // Upload image to storage
      const { error: errorImage } =
        await supabase.storage
          .from("images")
          .upload(filePath, image);

      if(errorImage){
        // console.log("error in image")
        // console.log("Message:", errorImage.message);
        alert("Cannot upload your photo");
        return;
      }

      // Get the publicURL for displaying the information
      const result = supabase.storage.from("images").getPublicUrl(filePath);
      const publicURL = result.data.publicUrl;


      //Update the database
      const {error: databaseError} = await supabase.from("creators").update({name: name, url: url, description: description, imageURL: publicURL }).eq("id", id);
      if(databaseError){

        console.log("error in database");
        if(!errorImage){
          await supabase.storage.from("images").remove([filePath]);
        }

        alert("Cannot update your information");
        return;
      }
      
      alert("Succesfully submitted");

   }

   if(loading){
    <div className="empty-state">
            <p>Loading your creators...</p>
    </div>
   }
 

  return(
    <div className='creator-add-container'>
      

      <div className="nav-links-container">
        <Link to="/" className="nav-link">Home</Link>
        <Link to={`/creators/${id}`} className="nav-link">View your changes</Link>
      </div>
      
     <form className="creator-form" onSubmit={handleSubmit}>
        <div className='form-section'>
            <label htmlFor="name">Creator name</label>
            <input type="text" id="name" value={name} onChange={ (e) => {setName(e.target.value)}}/> 
        </div>

        <div className='form-section'>
            <label htmlFor="description">Creator description</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => {setDescription(e.target.value)}}
            >
              Type your description here
            </textarea>

         </div>


        <div className='form-section'>

          <label htmlFor="image">Creator image</label>
          <input type="file" id="image" name="image" accept="image/jpeg, image/png, image/webp" onChange={handleImageChange}/>

        </div>



         <div className='form-section'>
          <label htmlFor="url">Creator's URL</label>
          <textarea
            name="url"
            id="url"
            value={url}
            onChange={(e) => {setUrl(e.target.value)}}
          >
            Type your creator's url here
          </textarea>

        </div>
        

        


        <button className='save-changes-button' type="submit">Save changes</button>

      
       
      </form>
      

      
    </div>
  )
}

export default CreatorEdit;