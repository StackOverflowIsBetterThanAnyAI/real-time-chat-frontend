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
        if (parsedStorageData) {
            const savedIsLoggedIn = parsedStorageData?.isloggedin
            if (typeof savedIsLoggedIn === 'boolean') {
                setIsLoggedIn(savedIsLoggedIn)
            } else {
                setItemInStorage('isloggedin', false)
                setIsLoggedIn(false)
            }
        }

        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const savedIsSettingsExpanded =
                parsedSessionData?.issettingsexpanded
            if (typeof savedIsSettingsExpanded === 'boolean') {
                setIsSettingsExpanded(savedIsSettingsExpanded)
            } else {
                setItemInSessionStorage('issettingsexpanded', false)
                setIsSettingsExpanded(false)
            }
        }
    }, [setIsLoggedIn, setIsSettingsExpanded])
}
