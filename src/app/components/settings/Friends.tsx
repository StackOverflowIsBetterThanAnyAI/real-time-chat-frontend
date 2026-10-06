'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchFriendsApi } from '@/api'
import {
    AddFriend,
    FriendsOverview,
    PendingFriends,
} from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'

const Friends = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Friends must be used within a ContextFriends.Provider')
    }
    const [friendsData, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Friends must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Friends must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const { showToast } = useToast()

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchFriends = useCallback(() => {
        handleFetchFriendsApi({
            setFriendsData,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            showToast,
        })
    }, [setFriendsData, setIsLoggedIn, setIsSettingsExpanded, showToast])

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
