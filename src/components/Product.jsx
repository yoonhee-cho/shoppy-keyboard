import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Product({ product }) {

    const { name, price, url, productId } = product;

    const navigate = useNavigate();

    return (
        <li 
            onClick={() => {
                navigate(`/products/${productId}`, {state: { product } });
            }}
            className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
                <img className='w-full h-96 object-cover' src={url} alt="img" />
                <div className='mt-2 px-2 text-lg'>
                    <h2 className='truncate font-bold'>{name}</h2>
                    <p>{`$${price}`}</p> 
                </div>
        </li>
    );
}

