'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchUserApi } from '@/api'
import { EmptyWindow, Sidebar } from '@/app/components/chat'
import {
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'

const Chat = () => {
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

    const fetchUser = useCallback(async () => {
        handleFetchUserApi({
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }, [setIsLoggedIn, setIsSettingsExpanded, setUserData, showToast])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    return (
        <main className="grid grid-cols-[1fr_1fr] md:grid-cols-[minmax(0,448px)_1fr] w-full h-full">
            {isLoading ? (
                <div>Hello World!</div>
            ) : (
                <>
                    <Sidebar />
                    <EmptyWindow />
                </>
            )}
        </main>
    )
}

export default Chat
