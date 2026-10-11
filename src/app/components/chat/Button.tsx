'use client'

import { useContext, useState } from 'react'
import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import {
    ContextChatFriendData,
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
import { ChatButtonProps } from '@/types'
import { handleLogoutApi } from '@/api'

const Button = ({ friend }: ChatButtonProps) => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Button must be used within a ContextChatFriendData.Provider'
        )
    }
    const [, setChatFriendData] = contextChatFriendData

    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Button must be used within a ContextFriends.Provider')
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Button must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Button must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error('Button must be used within a ContextUserData.Provider')
    }
    const [, setUserData] = contextUserData

    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const hanldeSetChatUser = () => {
        setChatFriendData(friend)
        handleOpenChat(friend.friend.userName)
    }

    const handleOpenChat = async (friend: string) => {
        try {
            setIsLoading(true)
            const response = await fetch(
                `http://localhost:8000/api/conversation/${friend}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                console.log(
                    'An unexpected error occurred while trying to open the chat',
                    response.status,
                    response.statusText
                )
                const error = await response.json()
                if (response.status === 401) {
                    handleLogoutApi({
                        setFriendsData,
                        setIsLoggedIn,
                        setIsSettingsExpanded,
                        setUserData,
                        showToast,
                    })
                    showToast({ label: 'Session expired. Logging user out.' })
                } else if (response.status >= 400 && response.status < 500) {
                    showToast({
                        label: `Could not open chat. ${error.error}`,
                    })
                } else if (response.status >= 500) {
                    showToast({
                        label: 'Could not open chat. Please try again.',
                    })
                }
                return
            }

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(
                'An unexpected error occurred while trying to open the chat',
                error
            )
            showToast({ label: 'Could not open chat.' })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <button
            className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60 w-full"
            onClick={hanldeSetChatUser}
        >
            {friend.friend.profilePicture ? (
                <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden">
                    <ProfilePicture
                        profilePicture={friend.friend.profilePicture}
                        size="small"
                    />
                </span>
            ) : (
                <FallbackProfilePicture
                    id={friend.id}
                    userName={friend.friend.userName}
                    size="large"
                />
            )}
            <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                <div className="text-normal truncate w-full text-left">
                    {friend.friend.userName}
                </div>
                <div className="text-small truncate w-full text-left">
                    {friend.friend.status}
                </div>
            </div>
        </button>
    )
}

export default Button
