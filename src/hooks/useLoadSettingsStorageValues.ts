'use client'

import { useEffect } from 'react'
import { useLoadSettingsStorageValuesProps } from '@/types'
import { getStoredSessionData, setItemInSessionStorage } from '@/utils'

export const useLoadSettingsStorageValues = ({
    setInternalStatus,
    setIsEditingStatus,
    setIsFriendsExpanded,
}: useLoadSettingsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()

        if (parsedSessionData) {
            const savedInternalStatus = parsedSessionData?.internalstatus
            if (
                typeof savedInternalStatus === 'string' &&
                savedInternalStatus.length <= 255
            ) {
                setInternalStatus(savedInternalStatus)
            } else {
                setItemInSessionStorage('internalstatus', '')
                setInternalStatus('')
            }

            const savedIsEditingStatus = parsedSessionData?.iseditingstatus
            if (typeof savedIsEditingStatus === 'boolean') {
                setIsEditingStatus(savedIsEditingStatus)
            } else {
                setItemInSessionStorage('iseditingstatus', false)
                setIsEditingStatus(false)
            }

            const savedIsFriendsExpanded = parsedSessionData?.isfriendsexpanded
            if (typeof savedIsFriendsExpanded === 'boolean') {
                setIsFriendsExpanded(savedIsFriendsExpanded)
            } else {
                setItemInSessionStorage('isfriendsexpanded', false)
                setIsFriendsExpanded(false)
            }
        }
    }, [setInternalStatus, setIsEditingStatus, setIsFriendsExpanded])
}
