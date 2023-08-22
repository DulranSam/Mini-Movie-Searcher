import "./App.css";
import {useState } from "react";
import Axios from "axios";

function App() {
  const [getx, setGet] = useState([]);
  const [form, setForm] = useState("");

 

  async function gettter(movie) {
    try {
      const r = await Axios.get(
        `https://www.omdbapi.com/?i=tt3896198&apikey=e3e5002f&s=${movie}`,
      ).then((r) => {
        setGet({...r.data});
      }).catch((e)=>{
        setGet(e.response.status).json(e.response.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  function onSubmit(e){
      e.preventDefault();
      gettter(form)
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          onChange={(e) => {
            setForm(e.target.value);
          }}
          placeholder="Enter Value"
          type="text"
          value={form}
        ></input>
        <div className="clicky">
          {getx.Search ? (
            getx.Search.map((result) => (
              <span key={result.imdbID} >
                <img src={result.Poster || "Image Unavailable"} alt={`${result.Title} Poster`} />
                <p>Title: {result.Title}</p>
                <p>Year: {result.Year}</p>
                <p>Type: {result.Type}</p>
   
              </span>
            ))
          ) : (
            <p>No search results</p>
          )}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
  
}

export default App;
