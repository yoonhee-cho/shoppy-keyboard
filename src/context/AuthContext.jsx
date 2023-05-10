import React, { useState, useEffect, useContext, createContext } from 'react';
import { updateUser } from '../api/firebase';

const AuthContext = createContext();

export function ProvideAuthContext ({children}) {
    const [user, setUser] = useState();

    useEffect(()=>{
        updateUser((user)=> setUser(user));
    }, []);

    return (
        <AuthContext.Provider value={{ user, uid: user && user.uid }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext);
}