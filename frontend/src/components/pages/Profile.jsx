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
        .post(`/api/unsaveblog`, { uid, title })
        .then(res => {
            console.log(res.data);
            alert("Blog unsaved!")
        })
        .catch(err => {
            console.log(err)
        })
        setUnsaveBlogTitle("");
        console.log(`Unsave blog title: ${unsaveBlogTitle}`)
    }

    const loadSavedBlogs = () => {
        let list = [];
        let result = [];

        savedBlogs.map(blogPost => {
            return list.push(
                <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">{blogPost.title}</strong>
          <h3 className="mb-0">{blogPost.date}</h3>
          <p className="card-text mb-auto">{blogPost.excerpt}</p>
          <Link to={`${blogPost.link}`}>Continue reading..</Link>
          <br/>
          <button onClick={(e) => {unsaveBlog(blogPost.title)}}>Unsave</button>
        </div>
        <div className="col-auto d-none d-lg-block">
            <img width='200' height='250' src={blogPost.photo} alt='thumbnail' />
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
        <div className="container pt-5 py-4 ">
            <input type="file" onChange={handleChange} accept="image/png, image/jpeg" />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <Avatar src={user.photoURL} alt="Profile Picture" />
            <p>User Email: {user?.email}</p>
            <p>Username: {user?.displayName}</p>
            <button onClick={handleLogout}>Logout</button>
            {savedBlogs && <>
            {loadSavedBlogs()} </>}
            <div>
        </div>
        </div>
        </div>
    )
}

export default Profile;
