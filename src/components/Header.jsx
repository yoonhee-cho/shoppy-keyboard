import React, { useState, useEffect } from 'react';
import { FaRegKeyboard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { updateUser, signInWithGoogle, signOutWithGoogle} from '../api/firebase';
import UserInfo from './UserInfo';
import Button from './UI/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';
                                                
export default function Header() {
    const {user} = useAuthContext();

    return (
        <header className='flex place-content-between items-center bg-slate-50 text-indigo-600 p-6'>
            <Link to ={`/`}>
                <div className='flex items-center space-x-2 text-3xl font-bold'>
                        <FaRegKeyboard />
                        <h1>Shoppy</h1>
                </div>
            </Link>
            <nav className='flex items-center space-x-4 text-xl'>
                <Link to='/products'>Products</Link>
                {user && <Link to='/cart'><CartStatus/></Link>}
                {user && user.isAdmin && <Link to='/newproducts'>Admin</Link>}
                {user && <UserInfo user={user}/>}
                {user ?
                    <Button onClick={signOutWithGoogle} text={'Log Out'}/> 
                    : 
                    <Button onClick={signInWithGoogle} text={'Log In'}/>
                }
            </nav>
        </header>
    );
}