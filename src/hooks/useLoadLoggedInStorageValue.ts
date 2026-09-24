'use client'

import { useEffect } from 'react'
import { useLoadLoggedInStorageValueProps } from '@/types/types'
import { getStoredData } from '@/utils/getStoredData'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const useLoadLoggedInStorageValue = ({
    setIsLoggedIn,
}: useLoadLoggedInStorageValueProps) => {
    return useEffect(() => {
        const parsedStorageData = getStoredData()
        const data = parsedStorageData?.isloggedin

        if (typeof data === 'boolean') {
            setIsLoggedIn(data)
        } else {
            setItemInStorage('isloggedin', false)
            setIsLoggedIn(false)
        }
    }, [setIsLoggedIn])
}
