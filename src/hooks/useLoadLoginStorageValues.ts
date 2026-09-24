'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN } from '@/constants/constants'
import { useLoadLoginStorageValuesProps } from '@/types/types'
import { getStoredData } from '@/utils/getStoredData'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const useLoadLoginStorageValues = ({
    setIsSigningUp,
    setUserName,
}: useLoadLoginStorageValuesProps) => {
    return useEffect(() => {
        const parsedStorageData = getStoredData()

        if (parsedStorageData) {
            const savedUsername = parsedStorageData?.username
            if (
                typeof savedUsername === 'string' &&
                USER_NAME_PATTERN.test(savedUsername)
            ) {
                setUserName(savedUsername)
            } else {
                setItemInStorage('username', '')
            }

            const savedIsSigningUp = parsedStorageData?.issigningup
            if (typeof savedIsSigningUp === 'boolean') {
                setIsSigningUp(savedIsSigningUp)
            } else {
                setItemInStorage('issigningup', false)
            }
        }
    }, [setIsSigningUp, setUserName])
}
