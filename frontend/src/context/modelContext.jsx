import { createContext, useState } from "react";

const ModelContext = createContext({})

const ModelContextProvider = ({children}) => {
    const [storyModalOpen, setStoryModalOpen] = useState(false)
    const [viewStory, setViewStory] = useState(false)
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false)

    return (
        <ModelContext.Provider value={{
            storyModalOpen, setStoryModalOpen,
            viewStory, setViewStory,
            isMoreOptionOpen, setIsMoreOptionOpen
        }}>
            {children}
        </ModelContext.Provider>
    )
}

export  {ModelContext, ModelContextProvider}