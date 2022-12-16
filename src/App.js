import './App.css';
import React, { useState, useEffect } from 'react';

function App() {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const API_URL = process.env.REACT_APP_API_URL;
  const API_KEY = process.env.REACT_APP_API_KEY;
  const url1 = API_URL + "?api_key=" + API_KEY + "&sort_by=primary_release_date.desc&page=" + page;

  useEffect(() => {
    async function fetchData(){
      const res = await fetch(url1)
      if (res.status === 200) {
        // console.log("he;l")
        return res.json();
      }
      else if (res.status === 404) {
        console.log("Movies not found 404")
        return;
      }
      else {
        console.log("Error occured")
        return;
      }

    }
    fetchData();

  },[])
  return (
    <div>
      {/* {process.env.REACT_APP_API_URL} */}
    </div>
  );
}

export default App;
