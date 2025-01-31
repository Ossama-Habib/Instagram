import { useState } from 'react';
import './createStory.css'
import { IoMdClose } from "react-icons/io";
import { useContext } from 'react';
import { ModelContext } from '../../context/modelContext';

const CreateStory = () => {   
    const {storyModalOpen, setStoryModalOpen} = useContext(ModelContext)
    const [content, setContent] = useState('');
    const POST_STORY_URI = import.meta.env.VITE_POST_STORY_URI;
    console.log(POST_STORY_URI)

    const handleStory = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(POST_STORY_URI,{
                method: "POST",
                "Content-Type" : "application/json",
                body: JSON.stringify(content),
                credentials: "include"
            })
            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.log(error.message)
        }

    }

    return (
        <>
            <section className='createStory'>
                <IoMdClose className='createStory__close_icon' onClick={() => setStoryModalOpen(!storyModalOpen)} />
                <div className="createStory__wrapper">
                    <h1>Post Story</h1>


                    <div className="createStory__form">
                        <h2>Drag photos and videos here</h2>

                        <form className="form__text" onSubmit={handleStory}>
                            <label htmlFor="text">
                                Enter Text
                            </label>
                            <input
                                type="text"
                                name="text"
                                id="text"
                                className='createStory__form_submitBtn'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                            <button>Post</button>
                        </form>
                    </div>

                 
                </div>
            </section>

        </>
    )
}

export default CreateStory