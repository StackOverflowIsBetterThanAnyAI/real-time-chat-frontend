'use client'

import { Fragment, useContext, useState } from 'react'
import Image from 'next/image'
import {
    FriendsDetails,
    FriendsFallback,
    FriendsLoading,
} from '@/app/components/settings'
import {
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { FriendType } from '@/types'
import { handleLogout } from '@/utils'

export type SettingsPendingFriendsProps = {
    isLoading: boolean
    pendingFriends: FriendType[]
}

const PendingFriends = ({
    isLoading,
    pendingFriends,
}: SettingsPendingFriendsProps) => {
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

    const handleAcceptRequest = async (id: number) => {
        setIsLoadingAccept(true)
        try {
            const response = await fetch(
                `http://localhost:8000/api/friends/${id}/accept`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                }
            )

            if (!response.ok) {
                console.log(
                    'An unexpected error occurred while trying to update the friend status',
                    response.status,
                    response.statusText
                )
                const error = await response.json()
                if (response.status === 401) {
                    handleLogout({ setIsLoggedIn, setIsSettingsExpanded })
                    showToast({ label: 'Session expired. Logging user out.' })
                } else if (response.status >= 400 && response.status < 500) {
                    showToast({
                        label: `Could not update friend status. ${error.error}`,
                    })
                } else if (response.status >= 500) {
                    showToast({
                        label: 'Could not update friend status. Please try again.',
                    })
                }
                return
            }

            const data = await response.json()
            console.log(data)
        } catch (error) {
            console.error(
                'An unexpected error occurred while trying to update the friend status',
                error
            )
            showToast({
                label: 'Could not update friend status. Please try again.',
            })
        } finally {
            setIsLoadingAccept(false)
        }
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
            <div className="px-4 py-2 text-small flex flex-col gap-2">
                {pendingFriendsSent.length ? (
                    <>
                        <h3 className="text-normal">Sent Friend Requests</h3>
                        {pendingFriendsSent.map((item) => {
                            return (
                                <Fragment key={item.id}>
                                    <div>{item.friend.profilePicture}</div>
                                    <div className="text-small">
                                        {item.friend.userName}
                                    </div>
                                    <button>Cancel</button>
                                </Fragment>
                            )
                        })}
                    </>
                ) : null}
                {pendingFriendsReceived.length ? (
                    <>
                        <h3 className="text-normal">
                            Received Friend Requests
                        </h3>
                        {pendingFriendsReceived.map((item) => {
                            return (
                                <Fragment key={item.id}>
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
                                    <button>Decline</button>
                                    <button
                                        onClick={() =>
                                            handleAcceptRequest(item.id)
                                        }
                                    >
                                        Accept
                                    </button>
                                </Fragment>
                            )
                        })}
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
