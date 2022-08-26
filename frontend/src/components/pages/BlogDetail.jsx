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
            commentList += payload
            alert("New comment logged.")
        }).catch((err) => {
            console.log(err)
        })
    }

    function saveBlog() {
        const blog_title = blog.title;
        const blog_date = blog.date_created;
        const blog_excerpt = blog.excerpt;
        const blog_link = `/blog/${blog.slug}`;
        const blog_photo = blog.thumbnail;
        const uid = user.uid;
        console.log(blog_photo)
        const payload = {
            uid, blog_link, blog_excerpt, blog_date, blog_title, blog_photo
        }
        console.log(JSON.stringify(payload))
        fetch("http://localhost:8000/api/saveblog",
        {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(payload)
        }).then((res) => {
            console.log(res.data)
            alert("Blog saved!")
        }).catch((err) => {
            console.log(err)
            alert(err.message)
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
        <div>
        <div className="main-theme">
        <div className='container mt-3 rounded p-4 section'>
            <h1 className='display-2'>{blog.title}</h1>
            <h2 className='text-mted mt-3'>Category: {capitalizeFirstLetter(blog.category)}</h2>
            <h4>{blog.date_created}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            {user &&
          <button onClick={saveBlog}>Save Blog</button>}
            <br></br>
            <div className="row d-flex justify-content-center">

  <div className="col-md-8 col-lg-6">
    <div className="card shadow-0 border" >
      <div className="card-body p-4">
        <div className="form-outline mb-4">
        {user && <>
          <input type="text" id="addANote" className="form-control" placeholder="Type comment..." autoFocus value={commentBody} onChange={e => setCommentBody(e.target.value)} onKeyPress={event => {
                if (event.key === 'Enter'){ 
                    handleSubmit()
                }}
            }
                />
          <label className="form-label">+ Add a note</label>
          </>}
          {!user && <>
        <p>You must be logged in to post a comment.</p> </>}
          </div>
          </div>
          </div>
          </div>
          </div>
            <>
            {commentList.map((comment) => {
        return(
        <div className="row d-flex justify-content-center">
  <div className="col-md-8 col-lg-6">
    <div className="card shadow-0 border" style={{backgroundColor: '#f0f2f5'}}>
      <div className="card-body p-4">

        <div className="card mb-4">
          <div className="card-body">
            <p>{comment.body}</p>

            <div className="d-flex justify-content-between">
              <div className="d-flex flex-row align-items-center">
                <img src={comment.photoURL} alt="avatar" width="25"
                  height="25" />
                <p className="small mb-0 ms-2">{comment.username}</p>
              </div>
            </div>
          </div>
        </div>

        </div>
        </div>
        </div>
        </div>
        )
    }
)
}
            </>
            {!commentList && 
            <>
            No comments yet.
            </>}
            <br></br>
            <Link className="m-3 p-3 btn-lg headers fs-5 text-white text-decoration-none" to='/blog'>Back to Blogs</Link>
           
        </div>
        </div>
        </div>
    )
}

export default BlogDetail;