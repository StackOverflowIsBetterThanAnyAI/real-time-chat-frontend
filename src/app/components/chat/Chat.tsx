'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchInitialDataApi } from '@/api'
import { EmptyWindow, Sidebar, Window } from '@/app/components/chat'
import {
    ContextChatFriendData,
    ContextFriends,
    ContextUserData,
} from '@/context'

import { useLogout, useToast } from '@/hooks'
import { ChatFriendType } from '@/types'

const Chat = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Chat must be used within a ContextFriends.Provider')
    }
    const [, setFriendsData] = contextFriends

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error('Chat must be used within a ContextUserData.Provider')
    }
    const [, setUserData] = contextUserData

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [chatFriendData, setChatFriendData] = useState<
        ChatFriendType | undefined
    >(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchUser = useCallback(async () => {
        handleFetchInitialDataApi({
            logout,
            setFriendsData,
            setIsLoading,
            setUserData,
            showToast,
        })
    }, [logout, setFriendsData, setUserData, showToast])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <ContextChatFriendData.Provider
            value={[chatFriendData, setChatFriendData]}
        >
            <main
                className={`${isLoading ? '' : 'grid'} grid-cols-[1fr_1fr] md:grid-cols-[minmax(0,384px)_1fr] w-full h-full`}
            >
                {isLoading ? null : <Sidebar />}
                {chatFriendData ? (
                    <Window />
                ) : (
                    <EmptyWindow isLoading={isLoading} />
                )}
            </main>
        </ContextChatFriendData.Provider>
    )
}

export default Chat
