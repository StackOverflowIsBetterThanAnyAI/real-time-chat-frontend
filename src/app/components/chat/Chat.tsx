'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { EmptyWindow, Sidebar } from '@/app/components/chat'
import { ContextUserData } from '@/context'
import { handleFetchUserApi } from '@/api'

const Chat = () => {
    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error('Chat must be used within a ContextUserData.Provider')
    }
    const [userData, setUserData] = contextUserData

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchUser = useCallback(() => {
        handleFetchUserApi({ setIsLoading, setUserData })
    }, [setUserData])

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
