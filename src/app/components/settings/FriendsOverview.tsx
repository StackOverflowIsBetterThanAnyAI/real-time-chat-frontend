'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
    FriendsDetails,
    FriendsFallback,
    FriendsLoading,
} from '@/app/components/settings'
import { SettingsFriendsOverviewProps } from '@/types'

const FriendsOverview = ({
    friends,
    isLoading,
}: SettingsFriendsOverviewProps) => {
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false)
    const friendsContent = () => {
        return isLoading ? (
            <FriendsLoading />
        ) : friends.length ? (
            <div className="px-4 py-2 text-small flex flex-col gap-4">
                {friends.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className="flex items-center justify-between gap-2"
                        >
                            <span className="flex min-w-0 items-center gap-2">
                                <Image
                                    src={`http://localhost:8000${item.friend.profilePicture}`}
                                    alt="profile picture"
                                    height={24}
                                    width={24}
                                    unoptimized={true}
                                    className="h-6 w-6 shrink-0 rounded-full outline-2 outline-zinc-100 object-cover"
                                />
                                <div className="truncate">
                                    {item.friend.userName}
                                </div>
                            </span>
                            <button
                                className="shrink-0 settings-menu-button not-disabled:outline-2 outline-red-600 small-button w-24 flex justify-center
                                hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                                disabled={isLoadingRemove}
                            >
                                Remove
                            </button>
                        </div>
                    )
                })}
            </div>
        ) : (
            <FriendsFallback fallback="Currently, you don&#39;t have any friends." />
        )
    }

    return <FriendsDetails content={friendsContent()} summary="Friends" />
}

export default FriendsOverview
