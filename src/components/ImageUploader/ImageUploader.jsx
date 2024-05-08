import React, { useState } from 'react'
import profile from '../../assets/user_profile.png';
import Image from '../../assets/avatar.jpg'
const ImageUploader = ({ typeOfImage, name, url }) => {
    const [file, setFile] = useState(url || null)
    const defaultHandleChangeFunction = (e) => {
        e.preventDefault();
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setFile(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <>
            <div htmlFor="image-upload " className='h-[14rem] cursor-pointer w-[14rem] border rounded-[9px] border-primary shadow-lg'>
                <label className='w-full h-full'>
                    <div className='h-full w-full rounded-[9px] flex justify-center items-center'>
                        {file ? <img className='w-full h-full rounded-[9px]' src={file} alt="" /> :
                            (typeOfImage === "profile" ? <img className='w-full h-full rounded-[9px]' src={profile} alt="" /> :
                                (typeOfImage === "image" ? <img className='w-full h-full rounded-[9px]' src={Image} /> :
                                    "no Image yet"))}
                        <input
                            name={name}
                            id='image-upload'
                            type="file"
                            className='hidden'
                            onChange={defaultHandleChangeFunction}
                            accept="image/*"
                        />
                    </div>
                </label>
            </div>
        </>
    )
}

export default ImageUploader