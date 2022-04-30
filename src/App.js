import "./App.css";
import "./components/popup.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Post from "./components/post";
import Pagination from "./components/Pagination";
import SearchBox from "./components/SearchBox";

export default function App() {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [details, setDetails] = useState();
  const [postPerPage] = useState(10);
  const [theam, setTheam] = useState("light");
  const [mode, setMode] = useState("Dark");
  const [popup, setPopup] = useState(false);
  const [searchfield, setSearchfield] = useState();


  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setPost(res.data.results);
      setLoading(false);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const fetchData = (url) => {
      fetch(url).then((response) => {
        setDetails(response.json());
      });
    };
    fetchData(post.url);
  }, [popup]);

  //get current post

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = post.slice(indexOfFirstPost, indexOfLastPost);

  //change page
  const paginate = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const toggleHandler = () => {
    if (theam === "light") {
      setTheam("dark");
      setMode("Light");
    } else {
      setTheam("light");
      setMode("Dark");
    }
  };

  const openPopup = () => {
    setPopup(true);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const searchChange=(e)=>{
    setSearchfield(e.target.value);
  }

  const filteredPost=currentPost.filter((p)=>{
    return p.name.toLowerCase().includes(searchfield.toLowerCase());
  })
  return  !filteredPost.length ?
  <h1>Loading.......</h1> 
  :(
    <div className={theam}>
      <h1>Pokemone</h1>
      <SearchBox searchChange={searchChange}/>

      {popup ? (
        <div className="popup--back">
          <div className="popup--content">
            <div className="popup--close" onClick={closePopup}>
              x
            </div>
            {details && (
              <>
                {" "}
                <h1>Details of pokemon. </h1>
                <h1>{details.base_experience}</h1>
                <h1>{details.weight}</h1>


              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
      <button
        onClick={() => {
          toggleHandler();
        }}
      >
        {mode}
      </button>

      <Post openPopup={openPopup} post={filteredPost} loading={loading} />
      <Pagination
        postPerPage={postPerPage}
        totalPost={post.length}
        paginate={paginate}
      />
    </div>
  );
}
