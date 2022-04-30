import React from "react";
import "./post.css";





const Post = ({ post, loading, openPopup}) => {
  if (loading) {
    return <h1>loading.....</h1>;
  }

  return (
    
    <div id="container" >
      {post.map((post, index) => {
        return (
        
          <div key={index} onClick={openPopup} >
            <p className="post">{post.name}</p>
          </div>
        );
      })}
    </div>
    
  );
};





export  default Post;