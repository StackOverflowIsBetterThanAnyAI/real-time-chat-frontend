'use client'

import { useEffect } from 'react'
import { useLoadChatStorageValuesProps } from '@/types'
import {
    checkIsChatFriendType,
    getStoredSessionData,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadChatStorageValues = ({
    setChatFriendData,
    setIsSidebarExpanded,
}: useLoadChatStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const savedChatFriendData = parsedSessionData?.chatfrienddata
            if (
                savedChatFriendData !== undefined &&
                savedChatFriendData !== null
            ) {
                if (checkIsChatFriendType(savedChatFriendData)) {
                    setChatFriendData(savedChatFriendData)
                } else {
                    setItemInSessionStorage('chatfrienddata', null)
                }
            }

            const savedIsSidebarExpanded = parsedSessionData?.issidebarexpanded
            if (typeof savedIsSidebarExpanded === 'boolean') {
                setIsSidebarExpanded(savedIsSidebarExpanded)
            } else {
                setItemInSessionStorage('issidebarexpanded', false)
            }
        }
    }, [setChatFriendData, setIsSidebarExpanded])
}
