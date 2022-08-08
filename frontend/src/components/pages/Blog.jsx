import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Blog() {
    const [blogs, setBlogs]=useState([]);
    const [featuredBlog, setFeaturedBlog]=useState([]);

    function fetchData() {
        axios
        .get("/api/blog/featured")
        .then(res => {
            setFeaturedBlog(res.data[0]);
        })
        .catch(err => {
            console.log(err)
        })
    }    
            
    useEffect(() => {
        fetchData();
        }
    , []);

    const capitalizeFirstLetter = (word) => {
        if (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    };

    const getBlogs = () => {
    };

return (
    <div className='container'>
        <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 link-secondary" to="/category/gardening">Gardening</Link>
          <Link className="p-2 link-secondary" to="/category/composting">Composting</Link>
          <Link className="p-2 link-secondary" to="/category/food">Food</Link>
          <Link className="p-2 link-secondary" to="/category/environment">Environment</Link>
        </nav>
      </div>

    <div className="p-4 p-md-5 mb-4 rounded text-bg-dark mt-5">
    <div className="col-md-6 px-0">
      <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
        <p className="lead my-3">{featuredBlog.excerpt}</p>
        <p className="lead mb-0">
            <Link to={`/blog/${featuredBlog.slug}`} className="text-white fw-bold">
                Continue reading...</Link></p>
    </div>
  </div>

    </div>
    );
}