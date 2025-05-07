import React , {useState,useEffect} from 'react'
import '../styles/CreatePage.css'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom';


function PostCreatePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title:'',
    description:'',
    category_id: '',
    image:'',
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/categories')
      .then(response => {
        setCategories(response.data); // Set the fetched categories
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);
  

  const handleChange = (e) =>{
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(formData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file.name  // or 'image' if your state key is 'image'
      }));
    }
  };
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:3000/posts',formData);

      setFormData({
        title: '',
        description: '',
        category_id: '',
        image: '',
      });
      navigate('/');
    }catch(error){
      console.error('Error creating post:',error)
    }
  };

  
  

  return (
    <div className="container">
      <Link to="/">← Back to home</Link>
      <div className="header-container">
      <h1>Create a new blog post</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="blogLabel" htmlFor="title">Blog Title:</label>
          <input id="title" name="title" type="text" onChange={handleChange} required />
        </div>
        <div>
          <label className="blogLabel" htmlFor="description">Description:</label>
          <textarea name="description" id="content" onChange={handleChange} required />
        </div>
        <div>
          <label className="blogLabel" htmlFor="category">Choose a category:</label>
          <select name="category_id" onChange={handleChange} required>
  <option value="">Select a Category</option>
  {categories.map(category => (
    <option key={category.category_id} value={category.category_id}>
      {category.category_name}
    </option>
  ))}
</select>

        </div>
        <div>
          <label className="blogLabel" htmlFor="image">Upload photo:</label>
          <input type="file" accept="image/*" id="image" name="image" onChange={handleImageChange}/>
        </div>

        <button className="createBtn" type="submit">Create Post</button>



      </form>
      
    </div>
  )
}

export default PostCreatePage
