//* This file is used for detailed editting creator.


import {useState} from 'react';
import { supabase } from '../client';
import {Link} from "react-router-dom"

function CreatorEdit({id}){

  
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  
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
  return(
    <div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Creator name</label>
        <input type="text" id="name" value={name} onChange={ (e) => {setName(e.target.value)}}/> 

        <label htmlFor="description">Creator description</label>
        <textarea
          name="description"
          id="description"
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
        >
          Type your description here
        </textarea>


        <label htmlFor="image">Creator image</label>
        <input type="file" id="image" name="image" accept="image/jpeg, image/png, image/webp" onChange={handleImageChange}/>



        <label htmlFor="url"></label>
        <textarea
          name="url"
          id="url"
          value={url}
          onChange={(e) => {setUrl(e.target.value)}}
        >
          Type your creator's url here
        </textarea>

        


        <button type="submit">Save changes</button>

        
       
      </form>
      
      <Link to={`/creators/${id}`}> View your changes</Link>
      <Link to={`/`}>Home</Link>
      
    </div>
  )
}

export default CreatorEdit;