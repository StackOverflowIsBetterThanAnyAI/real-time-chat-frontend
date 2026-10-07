'use client'

import { useState } from 'react'
import { GrRevert } from 'react-icons/gr'
import { FriendInfo } from '@/app/components/settings'

export type SettingsPendingFriendsItemSentProps = {
    id: number
    profilePicture: string
    userName: string
}

const PendingFriendsItem = ({
    id,
    profilePicture,
    userName,
}: SettingsPendingFriendsItemSentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    return (
        <div className="flex gap-2 justify-between">
            <FriendInfo
                id={id}
                profilePicture={profilePicture}
                userName={userName}
            />
            <button
                onClick={() => {}}
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
