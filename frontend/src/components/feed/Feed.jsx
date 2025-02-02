import './feed.css'
import Stories from '../stories/Stories'
import FeedPost from '../feedPost/FeedPost'
import { useEffect, useState } from 'react'

const Feed = () => {
  const [items, setItems] = useState([])
  const [loading, setloading] = useState(true)
  const [stories, setStories] = useState([])

  const feedContent = async () => {
    const FEED_URI = import.meta.env.VITE_FEED_URI
    try {
      const response = await fetch(FEED_URI,{
        credentials: 'include'
      })
      const data = await response.json()
      setItems(data)
      setloading(false)
    } catch (error) {
      console.log(`Error in feedContent \n ${error.message}`)
    }
  }

  const GetStories = async () => {
    const ALL_STORIES_URI = import.meta.env.VITE_All_STORY_URI
    try {
      const response = await fetch(ALL_STORIES_URI,{
        credentials: "include"
      })
      const data = await response.json()
      setStories(data)
    } catch (error) {
      
      console.log(`Error in feedContent \n ${error.message}`)
    }
  }

  useEffect(() => {
    feedContent()
    GetStories()
  },[])

  if(loading){
    return <h1>Loading...</h1>
  }
  console.log(items.length)
  return (
    <div className='feed'>
        <Stories stories = {stories}/>
        {items.length === 0 &&(
              <p  style={{margin: "5rem"}}>You Should Follow Users To View Their Posts And Stories, search. hamza</p>
               ) 
            }
        {items.map((item, index) => {
          return (
            <FeedPost item={item} key={index} length = {items.length}/>

          )
        })}
    </div>
  )
}

export default Feed