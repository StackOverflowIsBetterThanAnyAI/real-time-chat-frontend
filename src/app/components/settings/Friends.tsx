'use client'

import { useCallback, useContext, useEffect, useState } from 'react'
import { handleFetchFriendsApi } from '@/api'
import {
    AddFriend,
    FriendsOverview,
    PendingFriends,
} from '@/app/components/settings'
import { ContextFriends, ContextIsDetailsExpanded } from '@/context'
import { useLoadFriendsStorageValues, useLogout, useToast } from '@/hooks'
import { setItemInSessionStorage } from '@/utils'

const Friends = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Friends must be used within a ContextFriends.Provider')
    }
    const [friendsData, setFriendsData] = contextFriends

    const contextIsDetailsExpanded = useContext(ContextIsDetailsExpanded)
    if (!contextIsDetailsExpanded) {
        throw new Error(
            'Friends must be used within a ContextIsDetailsExpanded.Provider'
        )
    }
    const [isDetailsExpanded, setIsDetailsExpanded] = contextIsDetailsExpanded

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

    useLoadFriendsStorageValues({ setFriendsData, setIsDetailsExpanded })

    useEffect(() => {
        fetchFriends()
    }, [fetchFriends])

    const friends =
        friendsData?.filter((item) => item.status === 'accepted') || []

    const pendingFriends =
        friendsData?.filter((item) => item.status === 'pending') || []

    const handleToggleDetails =
        (key: keyof typeof isDetailsExpanded) =>
        (value: boolean | ((prev: boolean) => boolean)) => {
            setIsDetailsExpanded((prev) => {
                const nextValue =
                    typeof value === 'function' ? value(prev[key]) : value
                const nextState = { ...prev, [key]: nextValue }
                setItemInSessionStorage('isdetailsexpanded', nextState)
                return nextState
            })
        }

    return (
        <>
            <FriendsOverview
                friends={friends}
                isLoading={isLoading}
                isExpanded={isDetailsExpanded.friendsOverview}
                setIsExpanded={handleToggleDetails('friendsOverview')}
            />
            <AddFriend
                isExpanded={isDetailsExpanded.addFriend}
                setIsExpanded={handleToggleDetails('addFriend')}
            />
            <PendingFriends
                isLoading={isLoading}
                pendingFriends={pendingFriends}
                isExpanded={isDetailsExpanded.pendingFriends}
                setIsExpanded={handleToggleDetails('pendingFriends')}
            />
        </>
    )
}

export default Friends
