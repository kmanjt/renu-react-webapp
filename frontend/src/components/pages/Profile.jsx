import React from 'react';

function Profile() {
    function handleChange() {

    }

    return (
        <div className="container pt-5">
            <input type="file" onChange={handleChange} />
        </div>
    )
}

export default Profile;