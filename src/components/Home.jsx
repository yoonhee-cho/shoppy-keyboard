import React from 'react';
import Products from './Products';

export default function Home() {
    return (
        <>  
            <section className='h-96 relative rounded-lg bg-indigo-300'>
                <div className='w-full h-full bg-cover bg-banner rounded-lg opacity-90'></div>
                <div className='absolute w-full top-32 text-center drop-shadow-2xl text-indigo-400'>
                    <h2 className='text-6xl font-bold mb-2'>Shop with us</h2>
                    <p className="text-3xl">Best Products, High Quality</p>
                </div>    
            </section>
           
            < Products/>
        </>
    );
}

