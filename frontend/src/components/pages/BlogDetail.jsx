import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});

    const createBlog = () => {
        return {__html: blog.content}
    };

    const slug = useParams().id;

    const capitalizeFirstLetter = (word) => {
        if (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    };
    
    useEffect(() => {
        const fetchData = async () => {
            axios
            .get(`/api/blog/${slug}`)
            .then(res => {
                setBlog(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        };
        fetchData();
        }
    , [useParams().id]);

    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.title}</h1>
            <h2 className='text-mted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.month} {blog.day}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
    )
}

export default BlogDetail;