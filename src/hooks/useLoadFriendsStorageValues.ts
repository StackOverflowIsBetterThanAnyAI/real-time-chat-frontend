'use client'

import { useEffect } from 'react'
import { FriendType, useLoadFriendsStorageValuesProps } from '@/types'
import {
    checkIsFriendType,
    getStoredSessionData,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadFriendsStorageValues = ({
    setFriendsData,
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
        }
    }, [setFriendsData])
}
