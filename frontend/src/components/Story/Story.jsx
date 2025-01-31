import './story.css'
import { IoMdClose } from "react-icons/io";
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ModelContext } from '../../context/modelContext';
import { useNavigate } from 'react-router-dom';

const Story = () => {
    const navigate = useNavigate()
    const {storyId} = useParams()
    const [loading, setLoading] = useState(true)
    const [storyContent, setStoryContent] = useState([])
    const [number, setNumber] = useState(0)

    const userStory = async () => {
        const USER_STORY_URI = `${import.meta.env.VITE_USER_STORY_URI}/${storyId}`
        try {
            const response = await fetch(USER_STORY_URI,{
                credentials: "include"
            })
            const data = await response.json()
            console.log(data)
            setStoryContent(data.content)
            setLoading(false)
        } catch (error) {
            console.log(`Error in single story \n ${error.message}`)
        }
    }
    
    useEffect(() => {
        userStory()
    }, [storyId])
    
    useEffect(() => {
        if (storyContent.length === 0) return;

        if(number === storyContent.length - 1) return;
        
        const timeInterval = setInterval(() => {
            setNumber(prevNumber => (prevNumber + 1) % storyContent.length);
        }, 3000);
        
        return () => clearInterval(timeInterval);
    }, [number, storyContent]);


    if(loading){
        return <h1>Loading....</h1>
    }


    
  return (
    <section className='single__story'>
        <div className="single__story_wrapper">
            <IoMdClose className='closeBtn' onClick={() => navigate('/')}/>
            
            <div className="story__top"></div>

            <div className="story__content">
                {/* {setStoryNumber} */}
                <h2>{storyContent[number]}</h2>
            </div>
        </div>
    </section>
  )
}

export default Story