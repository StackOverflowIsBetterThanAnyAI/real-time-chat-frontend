'use client'

import { useContext } from 'react'
import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import { ContextChatFriendData, ContextIsChatOpened } from '@/context'
import { ChatButtonProps } from '@/types'

const Button = ({ friend }: ChatButtonProps) => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Button must be used within a ContextChatFriendData.Provider'
        )
    }
    const [, setChatFriendData] = contextChatFriendData

    const contextIsChatOpened = useContext(ContextIsChatOpened)
    if (!contextIsChatOpened) {
        throw new Error(
            'Button must be used within a ContextIsChatOpened.Provider'
        )
    }
    const [, setIsChatOpened] = contextIsChatOpened

    const hanldeSetChatUser = () => {
        setChatFriendData(friend)
        setIsChatOpened(true)
    }

    return (
        <button
            className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
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
