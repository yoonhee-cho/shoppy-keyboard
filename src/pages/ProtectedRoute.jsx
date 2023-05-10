import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({children, requireAdmin}) {
    // user가 없거나, 어드민이 아니면 navigate을 이용해서 홈으로 이동하게 하기
    // user가 있거나, 어드민이면 children을 리턴해주기
    const { user } = useAuthContext();

    if (user === undefined) return <></>

    if(!user || (!user.isAdmin && requireAdmin)) {
       return <Navigate to='/' replace={true} />
    }
    return children
}

