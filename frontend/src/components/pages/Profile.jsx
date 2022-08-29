import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserAuth, upload } from '../../hocs/Auth';
import { Link, useNavigate } from 'react-router-dom';
import axios  from 'axios';
import { connectStorageEmulator } from 'firebase/storage';

function Profile() {
    const { user, logout } = UserAuth();
    const [photoURL, setPhotoURL] = useState("");
    const [photo, setPhoto]=useState(null);
    const [loading, setLoading]=useState(false);
    const [savedBlogs, setSavedBlogs]=useState([]);
    const [unsaveBlogTitle, setUnsaveBlogTitle]=useState("");
    const navigate = useNavigate();

    const unsaveBlog = (e) => {
        const uid = user.uid;
        const title = e;
        axios
        .post(`http://localhost:8000/api/unsaveblog`, { uid, title })
        .then(res => {
            setSavedBlogs(res.data)
            alert("Blog unsaved!")
        })
        .catch(err => {
            console.log(err)
        })
        setUnsaveBlogTitle("");
        console.log(`Unsave blog title: ${unsaveBlogTitle}`)
    }


    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            console.log("You are logged out.")
        } catch (error) {
            console.log(error.message)
        }
    }

    const getSavedBlogs = async () => {
        const uid = user.uid;
        axios
        .post(`http://localhost:8000/api/getsavedblogs`, {uid})
        .then(res => {
            console.log(res.data)
            setSavedBlogs(res.data)
        })
        .catch(err => {
            console.log(err.message)
        })
    };

    function handleClick() {
        upload(photo, user, setLoading)
    }

    function handleChange(e) {
        if (e.target.files[0]) {
            if (e.target.files[0].size < 1000 * 1024) {
                setPhoto(e.target.files[0])
            }
            else {
                alert("File must be less than 1mb!")
            }
        }
    }

    useEffect(() => {
        console.log(user.photoURL);
        setPhotoURL(user.photoURL);
    }, [user])

    useEffect(() => {
        getSavedBlogs();
    }, [])

    return (
        <div className="main-theme">
        <div className="container section rounded-3 pt-5 py-4 ">
            <div className='row'>
                <div className='col-md-1 mb-1 '>
                    <Avatar src={user.photoURL} alt="Profile Picture" sx={{ width: 66, height: 66 }} />
                </div>
                <div className='col-md-3'>
                <h1 className='fs-1'>{user?.displayName}</h1>
                </div>
            </div>
            <br>
            </br>
            <div className='row'>
                <div className='col-md-4'>
                    <h3>Change profile picture?</h3>
                    <br></br>
                    <input type="file" onChange={handleChange} accept="image/png, image/jpeg" />
                    <button className="headers bth-lg rounded border-0 p-2" disabled={loading || !photo} onClick={handleClick}>Upload</button>
                </div>
                <div className='col-md-2'>
                   
                </div>
            </div>
            <br></br>
            <br></br>
            
            <div>
                {savedBlogs.length != 0 && 
                    <h3 className='fs-4'>Your saved blogs</h3>
                }
                {savedBlogs.length == 0 &&
                    <h3 className='fs-4'>No saved blogs</h3>
                }
                {
                savedBlogs? 
                savedBlogs.map((blogPost) => {
                return(
                    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                        
                        <div className="col p-4 d-flex flex-column position-static">
                            <strong className="d-inline-block mb-2 text-primary">{blogPost.title}</strong>
                            <h3 className="mb-0">{blogPost.date}</h3>
                            <p className="card-text mb-auto">{blogPost.excerpt}</p>
                            <Link to={`${blogPost.link}`}>Continue reading..</Link>
                                <br/>
                            </div>
                            <div className='col-md-3'>
                            <button  className='headers bth-lg rounded border-0 p-2' onClick={(e) => {unsaveBlog(blogPost.title)}}>Unsave</button>
                        </div>
                        <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.photo} alt='thumbnail' />
                </div>
            </div>
               )
              }): null
            }
            </div>
            <br></br>
            <div className='row'>
                <div className='col-md-3'>
                <button className='headers bth-lg rounded border-0 p-2' onClick={handleLogout}>Logout</button>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default Profile;
