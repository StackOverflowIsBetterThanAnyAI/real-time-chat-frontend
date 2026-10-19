'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchInitialDataApi, handleSendHeartbeatApi } from '@/api'
import { EmptyWindow, Sidebar, Window } from '@/app/components/chat'
import {
    ContextChatFriendData,
    ContextFriends,
    ContextIsDetailsExpanded,
    ContextUserData,
} from '@/context'

import {
    useLoadChatStorageValues,
    useLoadFriendsStorageValues,
    useLogout,
    useToast,
} from '@/hooks'

const Chat = () => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Chat must be used within a ContextChatFriendData.Provider'
        )
    }
    const [chatFriendData, setChatFriendData] = contextChatFriendData

    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Chat must be used within a ContextFriends.Provider')
    }
    const [friendsData, setFriendsData] = contextFriends

    const contextIsDetailsExpanded = useContext(ContextIsDetailsExpanded)
    if (!contextIsDetailsExpanded) {
        throw new Error(
            'Chat must be used within a ContextIsDetailsExpanded.Provider'
        )
    }
    const [, setIsDetailsExpanded] = contextIsDetailsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error('Chat must be used within a ContextUserData.Provider')
    }
    const [, setUserData] = contextUserData

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSidebarExpanded, setIsSidebarExpanded] = useState<boolean>(false)

    const fetchUser = useCallback(async () => {
        handleFetchInitialDataApi({
            logout,
            setFriendsData,
            setIsLoading,
            setUserData,
            showToast,
        })
    }, [logout, setFriendsData, setUserData, showToast])
    const handleSendHeartbeat = useCallback(async () => {
        handleSendHeartbeatApi({ logout, showToast })
    }, [logout, showToast])

    useLoadChatStorageValues({ setChatFriendData, setIsSidebarExpanded })
    useLoadFriendsStorageValues({ setFriendsData, setIsDetailsExpanded })

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    useEffect(() => {
        handleSendHeartbeat()
        const interval = setInterval(() => {
            handleSendHeartbeat()
        }, 30000)
        return () => clearInterval(interval)
    }, [handleSendHeartbeat])

    return (
        <main
            className={`${!friendsData && !chatFriendData ? '' : 'grid'} grid-cols-[76px_1fr] sm:grid-cols-[256px_1fr]
            md:grid-cols-[320px_1fr] lg:grid-cols-[384px_1fr] w-full h-full`}
        >
            {chatFriendData && friendsData ? (
                <>
                    <Sidebar
                        isSidebarExpanded={isSidebarExpanded}
                        setIsSidebarExpanded={setIsSidebarExpanded}
                    />
                    <Window />
                </>
            ) : friendsData ? (
                <>
                    <Sidebar
                        isSidebarExpanded={isSidebarExpanded}
                        setIsSidebarExpanded={setIsSidebarExpanded}
                    />
                    <EmptyWindow isLoading={isLoading} />
                </>
            ) : (
                <EmptyWindow isLoading={isLoading} />
            )}
        </main>
    )
}

export default Chat
