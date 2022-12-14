import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../baseStyle.css';
import { UserAuth } from '../../hocs/Auth';

export default function Blog() {
    const [blogs, setBlogs]=useState([]);
    const [featuredBlog, setFeaturedBlog]=useState([]);

    const {user} = UserAuth();

    function fetchBlogs() {
        axios
        .get("/api/blog/")
        .then(res => {
            setBlogs(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }    


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
        fetchBlogs();
        }
    , []);

    const capitalizeFirstLetter = (word) => {
        if (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    };

    const getBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-light p-3">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-dark">{capitalizeFirstLetter(blogPost.category)}</strong>
          <h3 className="mb-0">{blogPost.title}</h3>
          <div className="mb-1 text-muted">{blogPost.date_created}</div>
          <p className="card-text mb-auto">{blogPost.excerpt}</p>
          <Link to={`/blog/${blogPost.slug}`} className="stretched-link text-dark text-decoration-none">Continue reading...</Link>
        </div>
        <div className="col-auto d-none d-lg-block">
            <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' className='rounded'/>
        </div>
        </div>
            );
        })

        for (let i=0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }
        return result;
    };

return (
    <div className=' main-theme'>
    <div className='container'>
        <div className="nav-scroller py-1 mb-2">
        <nav className="nav d-flex justify-content-between">
          <Link className="p-2 link-secondary" to="/category/gardening">Gardening</Link>
          <Link className="p-2 link-secondary" to="/category/composting">Composting</Link>
          <Link className="p-2 link-secondary" to="/category/food">Food</Link>
          <Link className="p-2 link-secondary" to="/category/environment">Environment</Link>
        </nav>
      </div>

    <div className="p-4 p-md-5 mb-4 rounded section mt-5">
    <div className="col-md-6 px-0">
      <h1 className="display-4 fst-italic">{featuredBlog.title}</h1>
        <p className="lead my-3 ">{featuredBlog.excerpt}</p>
        <br></br>
            <Link className="text-dark m-3 p-3 fs-5 btn-lg headers dark-green text-decoration-none" to={`/blog/${featuredBlog.slug}`}>
                Continue reading...</Link>
    </div>
  </div>
  <div >
    {getBlogs()}
    </div>
    </div>
    </div>
    );
}