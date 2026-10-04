'use client'

import { useEffect } from 'react'
import { useLoadLoggedInStorageValueProps } from '@/types'
import {
    getStoredData,
    getStoredSessionData,
    setItemInStorage,
    setItemInSessionStorage,
} from '@/utils'

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
