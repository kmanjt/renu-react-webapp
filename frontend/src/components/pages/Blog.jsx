import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Blog() {
    const [blogs, setBlogs]=([]);
    const [featuredBlog, setFeaturedBlog]=([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/blog/featured");
                setFeaturedBlog(res.data[0]);
            } catch (error) {
                
            }

        }
        fetchData();
    }, []);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await axios.get("/api/blog/");
                setBlogs(res.data);
            } catch (error) {
                
            }

        }
        fetchBlogs();
    }, []);

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
      <h1 className="display-4 fst-italic">Title of a longer featured blog post</h1>
      <p className="lead my-3">Multiple lines of text that form the lede, informing new readers quickly and efficiently about what’s most interesting in this post’s contents.</p>
      <p className="lead mb-0"><a href="#" class="text-white fw-bold">Continue reading...</a></p>
    </div>
  </div>

    </div>
    )
};

export default Blog;