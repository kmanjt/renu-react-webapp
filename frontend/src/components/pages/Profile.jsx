import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserAuth, upload } from '../../hocs/Auth';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

function Profile() {
    const { user, logout } = UserAuth();
    const [photoURL, setPhotoURL] = useState("");
    const [photo, setPhoto]=useState(null);
    const [commentBody, setCommentBody]=useState("");
    const [comments, setComments]=useState([]);
    const [loading, setLoading]=useState(false);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout()
            navigate('/')
            console.log("You are logged out.")
        } catch (error) {
            console.log(error.message)
        }
    }

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
        })
    }

    function handleClick() {
        upload(photo, user, setLoading)
    }

    function handleChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    useEffect(() => {
        console.log(user.photoURL);
        setPhotoURL(user.photoURL);
    }, [user])

    return (
        <div className="container pt-5 py-4">
            <input type="file" onChange={handleChange} />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <Avatar src={user.photoURL} alt="Profile Picture" />
            <p>User Email: {user?.email}</p>
            <button onClick={handleLogout}>Logout</button>

            <div>
        <input type="text" autoFocus value={commentBody} onChange={e => setCommentBody(e.target.value)}>
            
        </input>
        <button onClick={handleSubmit}>
            Submit
        </button>
        </div>
        </div>
    )
}

export default Profile;