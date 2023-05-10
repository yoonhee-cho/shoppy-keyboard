import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/UI/Button';
import useCart from '../hooks/useCart';
import { useAuthContext } from '../context/AuthContext';

export default function ProductDetail() {
    const { uid } = useAuthContext();

    const {addOrUpdateItem} = useCart();

    const {
        state: {
            product: { productId, url, name, description, price, color_options}
        }
    } = useLocation();
    const [success, setSuccess] = useState();
    const [selected, setSelected] = useState(color_options && color_options[0]);

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    const handleClick = (e) => {
        const product = {productId, url, name, price, option: selected, quantity: 1};
        addOrUpdateItem.mutate(product, {
            onSuccess: () => {
                if(!uid){
                    setSuccess('Please log in to add the item to cart');
                    setTimeout(() => setSuccess(null), 3000)
                }
                else {
                    setSuccess('The item is added to cart');
                    setTimeout(() => setSuccess(null), 3000)
                }
            }
        });
    }

    return (
        <section className='flex flex-col md:flex-row p-4'>
            
            <img className='w-96 h-full object-cover px-4 basis-7/12 rounded-lg' src={url} alt={name} />

            <div className='w-full basis-5/12 flex flex-col p-4'>
                <h2 className='text-3xl font-bold py-2 border-b border-gray-400'>{name}</h2>
                <p className='text-2xl font-bold py-2'>${price}</p>
                <p className='py-4 text-lg'>{description}</p>
                <div className='flex items-center'>
                    <label className='font-bold' htmlFor='select'>option:</label>
                    <select 
                        className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
                        id='select' onChange={handleSelect} value={selected}>
                        {color_options && color_options.map((color_option, idx) => <option key={idx}>{color_option}</option> )}
                    </select>
                </div>
                {success && <p className='my-2'>{success}</p>}
                <Button text='Add to cart' onClick={handleClick}/>
            </div>

        </section>
    );
}

