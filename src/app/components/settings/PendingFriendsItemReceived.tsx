'use client'

import { useContext, useState } from 'react'
import { MdCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import { FriendInfo } from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { handleAcceptRequestApi } from '@/api'

export type SettingsPendingFriendsItemReceivedProps = {
    id: number
    profilePicture: string
    userName: string
}

const PendingFriendsItem = ({
    id,
    profilePicture,
    userName,
}: SettingsPendingFriendsItemReceivedProps) => {
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
        handleAcceptRequestApi({
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
                    onClick={() => {}}
                    className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                    hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                    disabled={isLoading}
                    title="Decline"
                >
                    <MdCancel color="#fb2c36" size={20} />
                </button>
                <button
                    onClick={
                        handleAcceptRequest
                            ? () => handleAcceptRequest(id)
                            : undefined
                    }
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
