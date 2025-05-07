import React from 'react';
import '../styles/PostCard.css';
import { Link } from 'react-router-dom';

function PostCard({post}) {
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Link to={`/post/${post.id}`} className="card">
      <img src={`./public/${post.image}`} alt="blog" className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-description">
        {truncateText(post.content, 75)}
        </p>
        
      </div>
      </Link>
  );
}

export default PostCard;
