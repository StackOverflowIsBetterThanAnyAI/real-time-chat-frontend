'use client'

import { useContext, useState } from 'react'
import { HiOutlineUserRemove } from 'react-icons/hi'
import { handleDeclineRequestApi } from '@/api'
import { FriendInfo } from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
import { SettingsFriendsOverviewItemProps } from '@/types'

const FriendsOverviewItem = ({
    id,
    profilePicture,
    userName,
}: SettingsFriendsOverviewItemProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'FriendsOverviewItem must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'FriendsOverviewItem must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'FriendsOverviewItem must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'FriendsOverviewItem must be used within a ContextUserData.Provider'
        )
    }
    const [, setUserData] = contextUserData

    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleRemoveFriend = async (id: number) => {
        await handleDeclineRequestApi({
            id,
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }

    return (
        <div key={id} className="flex items-center justify-between gap-2">
            <FriendInfo
                id={id}
                profilePicture={profilePicture}
                userName={userName}
            />
            <button
                className="shrink-0 settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                disabled={isLoading}
                onClick={() => handleRemoveFriend(id)}
                title="Remove Friend"
            >
                <HiOutlineUserRemove size={20} color="#fb2c36" />
            </button>
        </div>
    )
}

export default FriendsOverviewItem
