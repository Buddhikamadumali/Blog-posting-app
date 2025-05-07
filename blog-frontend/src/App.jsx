import React from 'react';
import Header from './components/Header';
import './index.css';
import Searchbar from './components/Searchbar';
import PostList from './components/PostList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostCreatePage from './pages/PostCreatePage';
import Home from './pages/Home';
import PostViewPage from './pages/PostViewPage';

function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/create" element={<PostCreatePage />} />
        <Route path="/post/:id" element={<PostViewPage />} />
      </Routes>
    </Router>
   
     
     
    </>
  )
}

export default App;
