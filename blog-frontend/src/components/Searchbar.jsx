import React,{useEffect,useState} from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import '../styles/Searchbar.css';

function Searchbar({selectedCategory, setSelectedCategory}) {
  const [categories, setCategories] = useState([]);
 

  useEffect(()=>{
    axios.get('http://localhost:3000/categories')
    .then(response=>{
      setCategories(response.data);
    })
    .catch(error=>{
      console.error('Error fetching categories:',error)
    });
  },[]);

  return (
    <div className="searchbar-container">
      <div className="category">
        <label>Category:</label>
        <select className="cat-types" value={selectedCategory} onChange={(e)=>setSelectedCategory(e.target.value)}>
          <option value="All">All</option>
          {categories.map((cat)=>(
            <option key={cat.category_id} value={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

     
    </div>
  );
}

export default Searchbar;
