import './stories.css'
import insta from '../../assets/insta-front-page.jpeg'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { ModelContext } from '../../context/modelContext';
import { IoMdAddCircle } from "react-icons/io";
import Story from '../Story/Story';
import { useNavigate } from 'react-router-dom';

const Stories = ({ stories }) => {
  const navigate = useNavigate()
  const containerRef = useRef()
  const { viewStory, setViewStory,storyModalOpen, setStoryModalOpen, } = useContext(ModelContext)
 

  const scrollView = (direction) => {
    const scrollAmount = 150;
    if (direction === 'right') {
      containerRef.current.scrollLeft += scrollAmount;
    }
    else if (direction === "left") {
      containerRef.current.scrollLeft -= scrollAmount;
    }
  }

  const handleViewStory = (storyId) => {
    navigate(`/story/${storyId}`)
  }

  return (
    <section className='story'>
      {viewStory && <Story />}
      <FaArrowLeft role='button' className='scroll__btn scroll__left' onClick={() => scrollView("left")} />
      <div className="story__wrapper" ref={containerRef} >
        <div className="single__user_story" onClick={() => setStoryModalOpen(true)}>
          <div className="user__story_info">
            <img src={insta} alt="" />
            <p>Create</p>
          </div>
        </div>
        {stories.map((story, index) => {
          const { user: { profileImg, userName } } = story
          return (
            <div className="single__user_story" key={index} onClick={() => handleViewStory(story._id)}>
              <div className="user__story_info">
                <img src={profileImg} alt="" />
                <p>{userName}</p>
              </div>
            </div>
          )
        })}

      </div>
      <FaArrowRight role='button' className='scroll__btn scroll__right' onClick={() => scrollView("right")} />
    </section>
  )
}

export default Stories