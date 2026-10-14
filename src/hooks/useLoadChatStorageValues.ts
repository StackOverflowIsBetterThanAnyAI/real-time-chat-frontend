'use client'

import { useEffect } from 'react'
import { ChatFriendType, useLoadChatStorageValuesProps } from '@/types'
import {
    checkIsChatFriendType,
    getStoredSessionData,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadChatStorageValues = ({
    setChatFriendData,
}: useLoadChatStorageValuesProps & {
    setChatFriendData: React.Dispatch<
        React.SetStateAction<ChatFriendType | undefined>
    >
}) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        const savedChatFriendData = parsedSessionData?.chatfrienddata
        if (savedChatFriendData !== undefined && savedChatFriendData !== null) {
            if (checkIsChatFriendType(savedChatFriendData)) {
                setChatFriendData(savedChatFriendData)
            } else {
                setItemInSessionStorage('chatfrienddata', null)
            }
        }
    }, [setChatFriendData])
}
