import React, { useState } from 'react';
import { uploadImage } from '../api/imgUploader';
import Button from './UI/Button';
import useProducts from '../hooks/useProducts';

export default function AddNewProduct() {
    const [item, setItem] = useState({});
    const [imgFile, setImgFile] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState(null);
    const {addProduct} = useProducts();

    const handleChange = (e) => {
        const { name, value, files } = e.target
        
        if(e.target.name ==='img_file'){
            //console.log('file e.target.files' ,e.target.files[0])
            setImgFile(files[0]);
            return;
        }

        setItem((prev) => ({
            ...prev,
            [name]: value
        }));
    }
   
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoading(true);
        // upload img to cloudinary and get img url
        uploadImage(imgFile)
        .then(url => {
            const product = {...item, url};
            addProduct.mutate(
                {product, url}, 
                {
                    onSuccess: ()=> {
                        setSuccessMsg('✅ Successfully uploaded!')
                        setTimeout(()=> {
                            setSuccessMsg(null)
                        }, 4000)
                    }
                }
            )
        })
        .finally(()=>{
            setLoading(false);
            setItem({});
            setImgFile('');
        })
    }

    return (

        <section className='w-full text-center'>
            <h2 className='text-2xl font-bold my-4'>Add New Product</h2>
            { successMsg && <p className='my-2'>{successMsg}</p>}
            { imgFile && <img src={URL.createObjectURL(imgFile)} className='w-96 mx-auto mb-2'></img>}
            <form className='flex flex-col px-12 m-6'>
                <input type="file" name='img_file' accept='image/png, image/jpeg' onChange={handleChange} required={true} />
                <input type="text"  name='name' placeholder='Product Name' value={item.name || ''} onChange={handleChange} required={true} />
                <input type="number" name='price' placeholder='Price' value={item.price || ''} onChange={handleChange} required={true} />
                <input type="text" name='description' placeholder='Description' value={item.description || ''} onChange={handleChange} required={true} />
                <input type="text" name='color_options' placeholder='Color Options' value={item.color_options || ''} onChange={handleChange} required={true} />
                
                <Button text={loading ? 'uploading to database...':'submit'} onClick={handleSubmit}></Button>
                
            </form>
        </section>
    );
}

