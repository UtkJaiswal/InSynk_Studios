import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import MovieModal from './Components/MovieModal';

function App() {
  //movies stores the movies to be displayed;
  const [movies, setMovies] = useState([]);

  //for searching movies
  const [query, setQuery]=useState('');


  //for storing total number of movies 
  const [totalResults,setTotalResults]=useState(0);



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

  //function to fetch more movie on scrolling
  const fetchMoreData = () => {
    setPage(page+1);
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      // console.log(data);
      // setTotalResults(data.total_results)
      setMovies(movies.concat(data.results));
    })
  };

  //function to search movie
  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=API_URL+"?api_key="+API_KEY+"&query="+query+"&sort_by=primary_release_date.desc"
      // const url=`https://api.themoviedb.org/3/search/movie?api_key=1b7cbfe3c55ec3b24cb5d15d9c16a490&query=${query}&sort_by=primary_release_date.desc`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }
  //handle change
  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="/home">INSYNC <br/>STUDIOS</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Search for a movie"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
          {movies.map((movieReq)=>
          <MovieModal key={movieReq.id+Math.random(10)} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <h2>No Movies Found</h2>
      )}
    </div>  
    </>
  );
}

export default App;
