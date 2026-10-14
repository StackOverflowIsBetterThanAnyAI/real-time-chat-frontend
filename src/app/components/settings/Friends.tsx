'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchFriendsApi } from '@/api'
import {
    AddFriend,
    FriendsOverview,
    PendingFriends,
} from '@/app/components/settings'
import { ContextFriends } from '@/context'
import { useLoadFriendsStorageValues, useLogout, useToast } from '@/hooks'

const Friends = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Friends must be used within a ContextFriends.Provider')
    }
    const [friendsData, setFriendsData] = contextFriends

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchFriends = useCallback(async () => {
        handleFetchFriendsApi({
            setFriendsData,
            setIsLoading,
            logout,
            showToast,
        })
    }, [setFriendsData, setIsLoading, logout, showToast])

    useLoadFriendsStorageValues({ setFriendsData })

    useEffect(() => {
        fetchFriends()
    }, [fetchFriends])

    const friends =
        friendsData?.filter((item) => item.status === 'accepted') || []

    const pendingFriends =
        friendsData?.filter((item) => item.status === 'pending') || []

    return (
        <>
            <FriendsOverview friends={friends} isLoading={isLoading} />
            <AddFriend />
            <PendingFriends
                isLoading={isLoading}
                pendingFriends={pendingFriends}
            />
        </>
    )
}

export default Friends
