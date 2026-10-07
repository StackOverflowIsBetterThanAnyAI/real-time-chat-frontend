'use client'

import { useContext, useState } from 'react'
import { GrRevert } from 'react-icons/gr'
import { MdCancel } from 'react-icons/md'
import { TiTick } from 'react-icons/ti'
import Image from 'next/image'
import {
    FriendsDetails,
    FriendsFallback,
    FriendsLoading,
} from '@/app/components/settings'
import { handleAcceptRequestApi } from '@/api'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { FriendType, SettingsPendingFriendsProps } from '@/types'

const PendingFriends = ({
    isLoading,
    pendingFriends,
}: SettingsPendingFriendsProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'PendingFriends must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'PendingFriends must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'PendingFriends must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const { showToast } = useToast()

    const [isLoadingAccept, setIsLoadingAccept] = useState<boolean>(false)

    const fallbackProfilePicture = [
        'from-red-500 to-red-700',
        'from-amber-500 to-amber-700',
        'from-blue-500 to-blue-700',
        'from-teal-500 to-teal-700',
        'from-green-500 to-green-700',
        'from-fuchsia-500 to-fuchsia-700',
    ]

    const handleAcceptRequest = async (id: number) => {
        handleAcceptRequestApi({
            id,
            setFriendsData,
            setIsLoadingAccept,
            setIsLoggedIn,
            setIsSettingsExpanded,
            showToast,
        })
    }

    const { pendingFriendsSent, pendingFriendsReceived } =
        pendingFriends.reduce<{
            pendingFriendsSent: FriendType[]
            pendingFriendsReceived: FriendType[]
        }>(
            (acc, item) => {
                if (item.direction === 'sent') {
                    acc.pendingFriendsSent.push(item)
                } else {
                    acc.pendingFriendsReceived.push(item)
                }
                return acc
            },
            {
                pendingFriendsSent: [],
                pendingFriendsReceived: [],
            }
        )

    const pendingFriendsContent = () => {
        return isLoading ? (
            <FriendsLoading />
        ) : pendingFriends.length ? (
            <div className="px-4 py-2 text-small flex flex-col gap-4">
                {pendingFriendsSent.length ? (
                    <>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-normal">
                                Sent Friend Requests
                            </h3>
                            {pendingFriendsSent.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-2 justify-between"
                                    >
                                        <span className="flex min-w-0 items-center gap-2">
                                            {item.friend.profilePicture ? (
                                                <Image
                                                    src={`http://localhost:8000${item.friend.profilePicture}`}
                                                    alt="profile picture"
                                                    height={24}
                                                    width={24}
                                                    unoptimized={true}
                                                    className="h-6 w-6 shrink-0 rounded-full outline-2 outline-zinc-100 object-cover"
                                                />
                                            ) : (
                                                <span
                                                    className={`w-6 h-6 shrink-0 flex justify-center items-center rounded-full bg-linear-180
                                                    ${fallbackProfilePicture[item.id % fallbackProfilePicture.length]}`}
                                                >
                                                    {item.friend.userName
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                            <div className="truncate">
                                                {item.friend.userName}
                                            </div>
                                        </span>
                                        <button
                                            onClick={() => {}}
                                            className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                                            disabled={isLoadingAccept}
                                            title="Cancel"
                                        >
                                            <GrRevert
                                                color="#fb2c36"
                                                size={20}
                                            />
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : null}
                {pendingFriendsReceived.length ? (
                    <>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-normal">
                                Received Friend Requests
                            </h3>
                            {pendingFriendsReceived.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="flex gap-2 justify-between"
                                    >
                                        <span className="flex min-w-0 items-center gap-2">
                                            {item.friend.profilePicture ? (
                                                <Image
                                                    src={`http://localhost:8000${item.friend.profilePicture}`}
                                                    alt="profile picture"
                                                    height={24}
                                                    width={24}
                                                    unoptimized={true}
                                                    className="h-6 w-6 shrink-0 rounded-full outline-2 outline-zinc-100 object-cover"
                                                />
                                            ) : (
                                                <span
                                                    className={`w-6 h-6 shrink-0 flex justify-center items-center rounded-full bg-linear-180
                                                    ${fallbackProfilePicture[item.id % fallbackProfilePicture.length]}`}
                                                >
                                                    {item.friend.userName
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                            <div className="truncate">
                                                {item.friend.userName}
                                            </div>
                                        </span>
                                        <span className="flex gap-2">
                                            <button
                                                onClick={() => {}}
                                                className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button flex justify-center
                                                hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                                                disabled={isLoadingAccept}
                                                title="Decline"
                                            >
                                                <MdCancel
                                                    color="#fb2c36"
                                                    size={20}
                                                />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleAcceptRequest(item.id)
                                                }
                                                className="settings-menu-button not-disabled:outline-2 outline-blue-600 small-button flex justify-center
                                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600"
                                                disabled={isLoadingAccept}
                                                title="Accept"
                                            >
                                                <TiTick
                                                    color="#155dfc"
                                                    size={20}
                                                />
                                            </button>
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </>
                ) : null}
            </div>
        ) : (
            <FriendsFallback fallback="Currently, you don&#39;t have any pending friend requests." />
        )
    }

    return (
        <FriendsDetails
            content={pendingFriendsContent()}
            summary="Pending Friend Requests"
        />
    )
}

export default PendingFriends
