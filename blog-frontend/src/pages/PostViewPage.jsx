import React,{useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import axios from 'axios';
import '../styles/PostViewPage.css';


function PostViewPage() {
  const {id}= useParams();
  const [post,setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/posts/${id}`)
    .then(response => setPost(response.data))
    .catch(error =>console.error('Error fetching post:',error))
  },[id]);

  if(!post) return <p>Loading...</p>

  return (
    <div className="post-detail">
      <Link to="/">← Back to all posts</Link>
      <h2>{post.title}</h2>
      <img src={`../public/${post.image}`} alt={post.title} className="card-image1" />
      <p>{post.content}</p>
      
    </div>
  )
}

export default PostViewPage
