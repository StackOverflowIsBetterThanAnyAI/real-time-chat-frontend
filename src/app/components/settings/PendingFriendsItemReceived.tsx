'use client'

import { useContext, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { handleAcceptRequestApi, handleDeclineRequestApi } from '@/api'
import { FriendInfo } from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { SettingsPendingFriendsItemProps } from '@/types'

const PendingFriendsItem = ({
    id,
    profilePicture,
    userName,
}: SettingsPendingFriendsItemProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'PendingFriendsItemReceived must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'PendingFriendsItemReceived must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'PendingFriendsItemReceived must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleAcceptRequest = async (id: number) => {
        await handleAcceptRequestApi({
            id,
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            showToast,
        })
    }
    const handleDeclineRequest = async (id: number) => {
        await handleDeclineRequestApi({
            id,
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            showToast,
        })
    }

    return (
        <div className="flex gap-2 justify-between">
            <FriendInfo
                id={id}
                profilePicture={profilePicture}
                userName={userName}
            />
            <span className="flex gap-2">
                <button
                    onClick={() => {
                        handleDeclineRequest(id)
                    }}
                    className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                    hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                    disabled={isLoading}
                    title="Decline"
                >
                    <MdCancel color="#fb2c36" size={20} />
                </button>
                <button
                    onClick={() => handleAcceptRequest(id)}
                    className="settings-menu-button not-disabled:outline-2 outline-blue-600 small-button flex justify-center
                    hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                    disabled={isLoading}
                    title="Accept"
                >
                    <TiTick color="#155dfc" size={20} />
                </button>
            </span>
        </div>
    )
}

export default PendingFriendsItem
