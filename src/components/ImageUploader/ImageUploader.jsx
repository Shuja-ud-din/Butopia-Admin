import React, { useState } from 'react'
import profile from '../../assets/user_profile.png';
const ImageUploader = ({ typeOfImage, imagePreview }) => {
    const [file, setFile] = useState(null)
    const { previewImage, setPreviewImage } = useState("")
    return (
        <>
            <div className='h-[14rem]  w-[14rem] border rounded-[9px] border-primary shadow-lg'>
                <label htmlFor="image-upload " className='cursor-pointe'>
                    {imagePreview ? <img src={imagePreview} alt="" /> :
                        (typeOfImage === "profile" ? <img src={profile} alt="" />
                            : <img src="other" alt="" />
                        )}
                    <div>
                        <input

                            type="file" className='hidden' value={file} />
                    </div>
                </label>
            </div>
        </>
    )
}

export default ImageUploader