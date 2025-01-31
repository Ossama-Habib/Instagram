import './createPost.css'
import { IoMdClose } from "react-icons/io";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../../features/PostSlice';
import { useSelector } from 'react-redux';
import { closePostModal } from '../../features/PostSlice';

const CreatePost = () => {
    const {isPostModalOpen} = useSelector(store => store.postInfo)
    const dispatch = useDispatch()
    const [imagePreview, setImagePreview] = useState(null); 

    useEffect(() => {
        if (isPostModalOpen) {
            document.body.style.overflow = "hidden"; 
          } else {
            document.body.style.overflow = "auto"; 
          }
          return () => {
            document.body.style.overflow = "auto";
          };
    }, [isPostModalOpen]);
  
    const handleFileChange = (event) => {
        const file = event.target.files[0]; 
        if (file) {
            const previewURL = URL.createObjectURL(file); 
            dispatch(createPost(file))
            setImagePreview(previewURL); 
        }
    };

    return (
        <>
            {isPostModalOpen &&
                <section className='createPost'>
                    <IoMdClose className='createPost__close_icon' onClick={() => dispatch(closePostModal())}/>
                    <div className="createPost__wrapper">
                        <h1>Create post</h1>


                        <div className="createPost__form">
                            <h2>Drag photos and videos here</h2>

                            <form className="form__files">
                                <label htmlFor="fileInput">
                                    select from computer
                                </label>
                                <input
                                    type="file"
                                    name="fileInput"
                                    id="fileInput"
                                    className='createPost__form_submitBtn'
                                    onChange={handleFileChange}
                                />
                            </form>
                        </div>

                        {imagePreview && (
                            <div className="image-preview">
                                <p>Selected Image:</p>
                                <img src={imagePreview} alt="Preview" />
                            </div>
                        )}
                    </div>
                </section>
            
            }
        </>
    )
}

export default CreatePost