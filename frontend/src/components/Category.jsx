import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import "./baseStyle.css"

const Category = (props) => {
    const [blogs, setBlogs]=useState([]);
    const [currentCategory, setCurrentCategory]=useState('');

    const capitalizeFirstLetter = (word) => {
        if (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    };

const category = useParams().id;

useEffect(() => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    

    setCurrentCategory(capitalizeFirstLetter(category));
    const fetchData = async () => {
        axios
        .post(`http://localhost:8000/api/blog/category`, { category }, config)
        .then(res => {
            setBlogs(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }    
    fetchData()
    }
    , [category]);
    
    const getCategoryBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative bg-light p-3">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.category)}</strong>
          <h3 className="mb-0">{blogPost.title}</h3>
          <div className="mb-1 text-muted">{blogPost.month}</div>
          <p className="card-text mb-auto">{blogPost.excerpt}</p>
          <Link to={`/blog/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
        </div>
        <div className="col-auto d-none d-lg-block">
            <img width='200' height='250' src={blogPost.thumbnail} alt='thumbnail' />
        </div>
        </div>
            );
        });
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
    }

    return (
        <div className='main-theme'>
        <div className='container mt-3 '>
            <h3 className='display-4'>{currentCategory} Category</h3>
            <br></br>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    <Link className="p-2 link-secondary" to="/category/gardening">Gardening</Link>
                    <Link className="p-2 link-secondary" to="/category/composting">Composting</Link>
                    <Link className="p-2 link-secondary" to="/category/food">Food</Link>
                    <Link className="p-2 link-secondary" to="/category/environment">Environment</Link>
                </nav>
            </div>
            <div className='section p-4 rounded'>
                <div>
            {getCategoryBlogs()}
            </div>
            </div>
            <button className='btn m-3 p-2 btn-lg headers'>
                <Link className="text-dark" to='/blog'>Back to Blogs</Link>
            </button>
        </div>
        </div>
    )
}

export default Category;