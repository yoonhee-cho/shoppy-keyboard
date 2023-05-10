import React from 'react';

export default function UserInfo({user}) {
    const {photoURL, displayName} = user
    return (
        <div className='flex items-center'>
            <img className='w-10 rounded-full' src={photoURL} alt="img" referrerPolicy='no-referrer' />
            <p>{displayName}</p>
        </div>
    );
}

