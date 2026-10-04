'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN } from '@/constants'
import { useLoadLoginStorageValuesProps } from '@/types'
import { getStoredData, setItemInStorage } from '@/utils'

export const useLoadLoginStorageValues = ({
    setIsSigningUp,
    setUserName,
}: useLoadLoginStorageValuesProps) => {
    return useEffect(() => {
        const parsedStorageData = getStoredData()

        if (parsedStorageData) {
            const savedUserName = parsedStorageData?.username
            if (
                typeof savedUserName === 'string' &&
                USER_NAME_PATTERN.test(savedUserName)
            ) {
                setUserName(savedUserName)
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
