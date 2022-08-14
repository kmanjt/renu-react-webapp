import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserAuth } from '../../hocs/Auth';

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});
    const [commentBody, setCommentBody] = useState("");
    const { user } = UserAuth();

    const createBlog = () => {
        return {__html: blog.content}
    };

    const slug = useParams().id;

    const capitalizeFirstLetter = (word) => {
        if (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    };
    
    function handleSubmit() {
        const uid = user.email;
        const photoURL = user.photoURL;
        const payload = {
            uid, photoURL, commentBody
        }
        console.log(JSON.stringify(payload))
        fetch("http://localhost:8000/api/comment",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
        }).then((res) => {
            console.log(res)
            alert("New comment logged.")
        }).catch((err) => {
            console.log(err)
        })
    }

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
            {!user &&
            <>
            You must be logged in to comment.
            </>}
            {user &&
            <>
            <input type="text" autoFocus value={commentBody} onChange={e => setCommentBody(e.target.value)}></input>
            <button onClick={handleSubmit}>
            Submit
            </button>
            </>}
            <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
    )
}

export default BlogDetail;