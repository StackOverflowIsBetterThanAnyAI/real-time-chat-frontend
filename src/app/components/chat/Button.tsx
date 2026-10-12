'use client'

import { useContext } from 'react'
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
import { handleOpenChatApi } from '@/api/handleOpenChatApi'

const Button = ({ friend }: ChatButtonProps) => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Button must be used within a ContextChatFriendData.Provider'
        )
    }
    const [chatFriendData, setChatFriendData] = contextChatFriendData

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

    const handleOpenChat = async (friend: string) => {
        await handleOpenChatApi({
            friend,
            setChatFriendData,
            setFriendsData,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }
    const hanldeSetChatUser = () => {
        if (chatFriendData?.friend.userName === friend.friend.userName) {
            return
        }
        setChatFriendData((prev) => ({
            ...prev,
            direction: friend.direction,
            friend: friend.friend,
            id: friend.id,
            status: friend.status,
            conversationId: -1,
            messages: [],
            draftedMessage: '',
        }))
        handleOpenChat(friend.friend.userName)
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
