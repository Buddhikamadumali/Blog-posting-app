import React,{ useEffect, useState} from 'react'
import PostCard from './PostCard.jsx'
import axios from 'axios'
import '../styles/PostList.css'

function PostList({selectedCategory}) {
  
  const [posts,setPosts] = useState([]);

  
  

  useEffect(() => {
    let url = 'http://localhost:3000/posts';
    console.log(selectedCategory)
    if (selectedCategory && selectedCategory !== 'All') {
      url += `?category=${selectedCategory}`;
    }

    axios.get(url)
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, [selectedCategory]);

  return (
    <div className="list-container">
      {console.log(posts)}
      {posts.length === 0?(
        <p>No blog posts found.</p>
      ):(
        posts.map(post=>(
          <PostCard key={post.id} post={post}/> 
        ))
      )}
      
    </div>
  );
}

export default PostList
