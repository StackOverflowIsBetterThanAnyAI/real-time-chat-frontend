'use client'

import { useEffect } from 'react'
import { useLoadLoggedInStorageValuesProps } from '@/types'
import {
    getStoredData,
    getStoredSessionData,
    setItemInStorage,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadLoggedInStorageValues = ({
    setIsLoggedIn,
    setIsSettingsExpanded,
}: useLoadLoggedInStorageValuesProps) => {
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
