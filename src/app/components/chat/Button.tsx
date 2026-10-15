'use client'

import { useContext } from 'react'
import { handleOpenChatApi } from '@/api'
import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import { ContextChatFriendData } from '@/context'
import { useLogout, useToast } from '@/hooks'
import { ChatButtonProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

const Button = ({ friend, isExpanded }: ChatButtonProps) => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Button must be used within a ContextChatFriendData.Provider'
        )
    }
    const [chatFriendData, setChatFriendData] = contextChatFriendData

    const { logout } = useLogout()
    const { showToast } = useToast()

    const handleOpenChat = async (friend: string) => {
        await handleOpenChatApi({
            friend,
            logout,
            setChatFriendData,
            showToast,
        })
    }
    const hanldeSetChatUser = () => {
        if (chatFriendData?.friend.userName === friend.friend.userName) {
            return
        }
        setChatFriendData((prev) => {
            const updatedChatFriendData = {
                ...prev,
                direction: friend.direction,
                friend: friend.friend,
                id: friend.id,
                status: friend.status,
                conversationId: -1,
                messages: [],
                draftedMessage: '',
            }
            setItemInSessionStorage('chatfrienddata', updatedChatFriendData)
            return updatedChatFriendData
        })
        handleOpenChat(friend.friend.userName)
    }

    return (
        <button
            className="sidebar-button regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60 w-full"
            onClick={hanldeSetChatUser}
            title={friend.friend.userName}
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
            {isExpanded ? (
                <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                    <div className="text-normal truncate w-full text-left">
                        {friend.friend.userName}
                    </div>
                    <div className="text-small truncate w-full text-left">
                        {friend.friend.status}
                    </div>
                </div>
            ) : null}
        </button>
    )
}

export default Button
