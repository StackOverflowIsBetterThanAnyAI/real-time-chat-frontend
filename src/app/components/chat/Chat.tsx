'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchInitialDataApi } from '@/api'
import { EmptyWindow, Sidebar, Window } from '@/app/components/chat'
import {
    ContextChatFriendData,
    ContextFriends,
    ContextIsChatOpened,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
import { FriendType } from '@/types'

const Chat = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Chat must be used within a ContextFriends.Provider')
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error('Chat must be used within a ContextIsLoggedIn.Provider')
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Chat must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error('Chat must be used within a ContextUserData.Provider')
    }
    const [, setUserData] = contextUserData

    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isChatOpened, setIsChatOpened] = useState<boolean | undefined>(false)
    const [chatFriendData, setChatFriendData] = useState<
        FriendType | undefined
    >(undefined)

    const fetchUser = useCallback(async () => {
        handleFetchInitialDataApi({
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }, [
        setFriendsData,
        setIsLoggedIn,
        setIsSettingsExpanded,
        setUserData,
        showToast,
    ])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <ContextChatFriendData.Provider
            value={[chatFriendData, setChatFriendData]}
        >
            <ContextIsChatOpened.Provider
                value={[isChatOpened, setIsChatOpened]}
            >
                <main
                    className={`${isLoading ? '' : 'grid'} grid-cols-[1fr_1fr] md:grid-cols-[minmax(0,384px)_1fr] w-full h-full`}
                >
                    {isLoading ? null : <Sidebar />}
                    {isChatOpened ? (
                        <Window friend={chatFriendData} />
                    ) : (
                        <EmptyWindow isLoading={isLoading} />
                    )}
                </main>
            </ContextIsChatOpened.Provider>
        </ContextChatFriendData.Provider>
    )
}

export default Chat
