import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  //movies stores the movies to be displayed;
  const [movies, setMovies] = useState([]);


  //page stores the page number to furthur fetch api requests
  const [page, setPage] = useState(1);


  //API_URL and API_KEY are  the url and api key respectively
  const API_URL = process.env.REACT_APP_API_URL;


  const API_KEY = process.env.REACT_APP_API_KEY;


  //url1 is the url to fetch the list of movies
  const url1 = API_URL + "?api_key=" + API_KEY + "&sort_by=primary_release_date.desc&page=" + page;



  //useEffect is needed to fetch the list of movies when the user first enters the site
  useEffect(() => {
    //fetchData function is used for API calling
    async function fetchData(){
      const res = await fetch(url1)

      //if movies exists
      if (res.status === 200) {
        // console.log("he;l")
        const data=await res.json();
        setMovies(movies.concat(data.results))
      }

      //if movies doesnot exists
      else if (res.status === 404) {
        console.log("Movies not found 404")
        return;
      }

      //some other error
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
