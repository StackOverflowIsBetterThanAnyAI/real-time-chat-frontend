'use client'

import { useEffect } from 'react'
import {
    FriendType,
    isDetailsExpandedType,
    useLoadFriendsStorageValuesProps,
} from '@/types'
import {
    checkIsFriendType,
    getStoredSessionData,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadFriendsStorageValues = ({
    setFriendsData,
    setIsDetailsExpanded,
}: useLoadFriendsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const isFriendsArray = (value: unknown): value is FriendType[] => {
                return Array.isArray(value) && value.every(checkIsFriendType)
            }
            const savedFriendsData = parsedSessionData?.friendsdata
            if (isFriendsArray(savedFriendsData)) {
                setFriendsData(savedFriendsData)
            } else {
                setItemInSessionStorage('friendsdata', null)
            }

            const savedIsDetailsExpanded = parsedSessionData.isdetailsexpanded
            if (savedIsDetailsExpanded) {
                const newIsDetailsExpanded: isDetailsExpandedType = {
                    friendsOverview: true,
                    addFriend: false,
                    pendingFriends: false,
                }
                if (!savedIsDetailsExpanded.friendsOverview) {
                    newIsDetailsExpanded.friendsOverview = false
                }
                if (savedIsDetailsExpanded.addFriend) {
                    newIsDetailsExpanded.addFriend = true
                }
                if (savedIsDetailsExpanded.pendingFriends) {
                    newIsDetailsExpanded.pendingFriends = true
                }
                setItemInSessionStorage(
                    'isdetailsexpanded',
                    newIsDetailsExpanded
                )
                setIsDetailsExpanded(newIsDetailsExpanded)
            }
        }
    }, [setFriendsData, setIsDetailsExpanded])
}
