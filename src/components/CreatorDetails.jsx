function CreatorDetails({name, url, imageURL, description}){
  return (
    <div>
      
      <p>{name}</p>
      <p>{imageURL}</p>
      <p>{description}</p>
      <p>URL: {url}</p>
      <button>Edit creator</button>

    </div>
  )
}

export default CreatorDetails;