import React from 'react';
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import useCart from '../hooks/useCart';

const ICON_STYLE = 'transition-all cursor-pointer hover:text-indigo-500 hover:scale-105 mx-1';

export default function CartItem({product, product:{productId, name, option, price, url, quantity}}) {
    const {addOrUpdateItem, removeItem} = useCart();

    const handleMinus = () => {
        if(quantity < 2) return ;
        addOrUpdateItem.mutate({ ...product, quantity: quantity-1 })
    }

    const handlePlus = () => addOrUpdateItem.mutate({ ...product, quantity: quantity+1 })

    const handleDelete = () => removeItem.mutate(productId);
    
    return (
        <li className='flex justify-between my-2 items-center'>
            <img className='w-24 md:w-48 rounded-lg' src={url} alt={name} />
            <div className='flex-1 flex justify-between ml-4'>
                <div className='basis-3/5'>
                    <p className='text-xl font-semibold'>{name}</p>
                    <p className='text-xl font-semibold'>{option}</p>
                    <p className='text-xl my-2'>${price}</p>
                </div>
               
                <div className='text-2xl flex items-center'>
                    <AiOutlineMinusSquare className={ICON_STYLE} onClick={handleMinus} />
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare className={ICON_STYLE} onClick={handlePlus} />
                    <RiDeleteBin5Fill className={ICON_STYLE} onClick={handleDelete} />
                </div>
            </div>
        </li>
    );
}

