'use client'

import { useContext, useState } from 'react'
import { GrRevert } from 'react-icons/gr'
import { handleDeclineRequestApi } from '@/api'
import { FriendInfo } from '@/app/components/settings'
import { SettingsPendingFriendsItemProps } from '@/types'
import { ContextFriends } from '@/context'
import { useLogout, useToast } from '@/hooks'

const PendingFriendsItem = ({
    id,
    profilePicture,
    userName,
}: SettingsPendingFriendsItemProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'PendingFriendsItemSent must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleDeclineRequest = async (id: number) => {
        await handleDeclineRequestApi({
            id,
            setFriendsData,
            setIsLoading,
            logout,
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
            <button
                onClick={() => {
                    handleDeclineRequest(id)
                }}
                className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                disabled={isLoading}
                title="Cancel"
            >
                <GrRevert color="#fb2c36" size={20} />
            </button>
        </div>
    )
}

export default PendingFriendsItem
