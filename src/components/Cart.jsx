import React from 'react';
import CartItem from './CartItem';
import PriceCard from './PriceCard';
import Button from './UI/Button';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import useCart from '../hooks/useCart';

const SHIPPING_FEE = 30

export default function Cart() {
    const { 
        cartQuery : { isLoading, data: products},
    } = useCart();

    if (isLoading) return <p>Loading...</p>

    const hasProducts = products && products.length > 0;
    const totalPrice = products && products.reduce((prev, curr) => prev + parseInt(curr.price) * curr.quantity, 0);

    return (
        <section className='p-8 flex flex-col'>
            <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>My Cart</p>
            {!hasProducts && <p>No products in your cart</p>}
            {hasProducts && 
            <>
                <ul className='border-b border-gray-300 mb-8 p-4 md:px-8 lg:px-16'>
                    {products && products.map((product) => 
                        <CartItem 
                            key={product.productId} 
                            product={product}
                        >
                        </CartItem>
                    )}
                </ul>
                <div className='flex justify-between items-center mb-6 px-2 md:p-8 lg:px-16'>
                    <PriceCard text='Products price' price={totalPrice}/> 
                    <BsFillPlusCircleFill className='shrink-0'/>
                    <PriceCard text ='Shipping fee' price={SHIPPING_FEE}/>
                    <FaEquals className='shrink-0'/>
                    <PriceCard text ='Total' price={totalPrice+SHIPPING_FEE}/>
                </div>
                <Button text='Order'/>
            </>}
        </section>
    );
}

