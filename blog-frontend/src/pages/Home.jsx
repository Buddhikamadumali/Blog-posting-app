import React,{useState} from 'react'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import PostList from '../components/PostList'

function Home() {

  const [selectedCategory,setSelectedCategory] = useState('All');
  return (
    <div>
         <div>
     <Header/> 
     <div className="background-image">
      <div className="text-container">
      <h1>Welcome to My Blog</h1>
      <p>Discover stories, ideas, and inspirations. Dive into the world of creativity with me.</p>
      </div>
     </div>
     <Searchbar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
     </div>
     <PostList selectedCategory={selectedCategory}/>
      
    </div>
  )
}

export default Home
