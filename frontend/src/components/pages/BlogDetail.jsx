import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserAuth } from '../../hocs/Auth';
import "../baseStyle.css"

const BlogDetail = (props) => {
    const [blog, setBlog] = useState({});
    const [commentList, setCommentList] = useState([]);
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
    
    const loadComments = () => {
        let list = [];
        let result = [];

        commentList.map(blogPost => {
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">{capitalizeFirstLetter(blogPost.username)}</strong>
          <h3 className="mb-0">{blogPost.time}</h3>
          <p className="card-text mb-auto">{blogPost.body}</p>
        </div>
        <div className="col-auto d-none d-lg-block">
            <img width='200' height='250' src={blogPost.photoURL} alt='thumbnail' />
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

    function handleSubmit() {
        const username = user.displayName;
        const uid = user.uid;
        const photoURL = user.photoURL;
        const payload = {
            username, uid, photoURL, commentBody, slug
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
        const fetchComments = async () => {
            console.log({slug})
            axios
            .post(`http://localhost:8000/api/comments`, {slug})
            .then(res => {
                setCommentList(res.data)
            })
            .catch(err => {
                console.log(err)
            })
        };
        fetchData();
        fetchComments();
        }
    , [useParams().id]);

    return (
        <div className="main-theme">
        <div className='container mt-3 rounded p-4 section'>
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
            <br></br>
           
            {commentList && <>
            {loadComments()}
            </>
            }
            {!commentList && 
            <>
            No comments yet.
            </>}
            <button className='btn m-3 p-2 btn-lg headers'><Link className="dark-green" to='/blog'>Back to Blogs</Link>
            </button>
        </div>
        </div>
    )
}

export default BlogDetail;