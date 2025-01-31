import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from 'socket.io-client'
import { useDispatch } from "react-redux";
import { newMessage } from "../features/MessagesSlice";
import { newPostComment } from "../features/PostSlice";

const SocketContext = createContext({})

const SocketContextProvider = ({ children }) => {
    const dispatch = useDispatch()
    const { loggedInUserId } = useSelector(store => store.auth)
    const [socket, setSocket] = useState('')

    useEffect(() => {
        if (loggedInUserId) {
            const server = io(import.meta.env.VITE_SOCKET_SERVER, {
                query: {
                    userId: loggedInUserId
                }
            })

            server.on('connect', () => {
                setSocket(server)
            })

            return () => {
                if (server) {
                    server.disconnect(); 
                }
            };
        }
    }, [loggedInUserId])

    useEffect(() => {
        if (socket) {
            socket.on('newMessage', (data) => {
                dispatch(newMessage(data))
            })
            socket.on('newPostComment', (data) => {
                dispatch(newPostComment(data))
            })

        }
    }, [socket, dispatch])


    return (
        <SocketContext.Provider value={{}}>
            {children}
        </SocketContext.Provider>
    )
}

export { SocketContext, SocketContextProvider }