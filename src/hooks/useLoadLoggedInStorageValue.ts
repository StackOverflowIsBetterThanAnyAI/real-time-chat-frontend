'use client'

import { useEffect } from 'react'
import { useLoadLoggedInStorageValueProps } from '@/types/types'
import { getStoredData } from '@/utils/getStoredData'
import { getStoredSessionData } from '@/utils/getStoredSessionData'
import { setItemInStorage } from '@/utils/setItemInStorage'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const useLoadLoggedInStorageValue = ({
    setIsLoggedIn,
    setIsSettingsExpanded,
}: useLoadLoggedInStorageValueProps) => {
    return useEffect(() => {
        const parsedStorageData = getStoredData()
        const dataIsLoggedIn = parsedStorageData?.isloggedin

        if (typeof dataIsLoggedIn === 'boolean') {
            setIsLoggedIn(dataIsLoggedIn)
        } else {
            setItemInStorage('isloggedin', false)
            setIsLoggedIn(false)
        }

        const parsedSessionData = getStoredSessionData()
        const dataIsSettingsExpanded = parsedSessionData?.issettingsexpanded

        if (typeof dataIsSettingsExpanded === 'boolean') {
            setIsSettingsExpanded(dataIsSettingsExpanded)
        } else {
            setItemInSessionStorage('issettingsexpanded', false)
            setIsSettingsExpanded(false)
        }
    }, [setIsLoggedIn, setIsSettingsExpanded])
}
