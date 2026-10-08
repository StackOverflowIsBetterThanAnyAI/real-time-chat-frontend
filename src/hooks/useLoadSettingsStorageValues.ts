'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN } from '@/constants'
import { useLoadSettingsStorageValuesProps } from '@/types'
import { getStoredSessionData, setItemInStorage } from '@/utils'

export const useLoadSettingsStorageValues = ({
    setIsEditingStatus,
    setIsFriendsExpanded,
}: useLoadSettingsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()

        if (parsedSessionData) {
            const savedIsEditingStatus = parsedSessionData?.iseditingstatus
            if (typeof savedIsEditingStatus === 'boolean') {
                setIsEditingStatus(savedIsEditingStatus)
            } else {
                setItemInStorage('iseditingstatus', false)
            }

            const savedIsFriendsExpanded = parsedSessionData?.isfriendsexpanded
            if (typeof savedIsFriendsExpanded === 'boolean') {
                setIsFriendsExpanded(savedIsFriendsExpanded)
            } else {
                setItemInStorage('isfriendsexpanded', false)
            }
        }
    }, [setIsEditingStatus, setIsFriendsExpanded])
}
