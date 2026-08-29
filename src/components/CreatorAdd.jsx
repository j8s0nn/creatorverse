import {useState} from 'react';
import { supabase } from '../client';
import {Link} from "react-router-dom"


function CreatorAdd(){


  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [id, setID] = useState(-1);


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



    e.preventDefault();

    //Random name for the image, prevent some invalid characters in the name
    const filePath = `creators/${crypto.randomUUID()}.png`;
      // Upload image to storage
      const {error: errorImage } =
        await supabase.storage
          .from("images")
          .upload(filePath, image);

      if(errorImage){
        // console.log("error in image")
        // console.log("Message:", errorImage.message);
        alert("Cannot upload your photo");
        console.log(errorImage);
        return;
      }

    // Get the publicURL for displaying the information
    const result = supabase.storage.from("images").getPublicUrl(filePath);
    const publicURL = result.data.publicUrl;

    // Get the id for viewing instantly
    const { data,error} = await supabase.from("creators").insert({name: name, description: description, url: url, imageURL: publicURL}).select();

    if(error){
      alert("Cannot save your creator. Try again");
      console.log(error.message)
      return;
    }

    console.log(data[0].id)
    setID(data[0].id)
    alert("Succesfully create your creator");

  }

  return <div>
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
      
      <Link to={`/creators/${id}`}> View your creator</Link>
      <Link to={`/`}>Home</Link>
    </div>



  
}

export default CreatorAdd;