import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { UserAuth, upload } from '../../hocs/Auth';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';

function Profile() {
    const { user, logout } = UserAuth();
    const [photoURL, setPhotoURL] = useState("");
    const [photo, setPhoto]=useState(null);
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
        <div className="main-theme">
        <div className="container pt-5 py-4 ">
            <input type="file" onChange={handleChange} accept="image/png, image/jpeg" />
            <button disabled={loading || !photo} onClick={handleClick}>Upload</button>
            <Avatar src={user.photoURL} alt="Profile Picture" />
            <p>User Email: {user?.email}</p>
            <p>Username: {user?.displayName}</p>
            <button onClick={handleLogout}>Logout</button>

            <div>
        </div>
        </div>
        </div>
    )
}

export default Profile;
