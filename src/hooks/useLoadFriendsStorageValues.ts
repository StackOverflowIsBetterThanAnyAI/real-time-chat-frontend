'use client'

import { useEffect } from 'react'
import { FriendType, useLoadFriendsStorageValuesProps } from '@/types'
import { getStoredSessionData, setItemInSessionStorage } from '@/utils'

export const useLoadFriendsStorageValues = ({
    setFriendsData,
}: useLoadFriendsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const isFriendType = (item: unknown): item is FriendType => {
                if (typeof item !== 'object' || item === null) return false

                if (
                    !('id' in item) ||
                    !('direction' in item) ||
                    !('status' in item) ||
                    !('friend' in item)
                ) {
                    return false
                }

                if (
                    typeof item.id !== 'number' ||
                    (item.direction !== 'sent' &&
                        item.direction !== 'received') ||
                    (item.status !== 'pending' && item.status !== 'accepted')
                ) {
                    return false
                }

                const friend = item.friend

                if (typeof friend !== 'object' || friend === null) {
                    return false
                }

                return (
                    'userName' in friend &&
                    typeof friend.userName === 'string' &&
                    friend.userName.length >= 5 &&
                    friend.userName.length <= 63 &&
                    'status' in friend &&
                    typeof friend.status === 'string' &&
                    friend.status.length <= 255 &&
                    'profilePicture' in friend &&
                    typeof friend.profilePicture === 'string' &&
                    friend.profilePicture.length <= 255
                )
            }

            const isFriendsArray = (value: unknown): value is FriendType[] => {
                return Array.isArray(value) && value.every(isFriendType)
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
