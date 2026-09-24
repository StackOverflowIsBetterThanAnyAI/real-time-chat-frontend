'use client'

import { useEffect } from 'react'
import { USER_NAME_PATTERN } from '@/constants/constants'
import { getStoredData } from '@/utils/getStoredData'
import { setItemInStorage } from '@/utils/setItemInStorage'

export type useLoadLoginStorageValuesProps = {
    setIsSigningUp: (value: React.SetStateAction<boolean>) => void
    setUserName: (value: React.SetStateAction<string>) => void
}

export const useLoadLoginStorageValues = ({
    setIsSigningUp,
    setUserName,
}: useLoadLoginStorageValuesProps) => {
    return useEffect(() => {
        const parsedStorageData = getStoredData()

        if (parsedStorageData) {
            const savedUsername = parsedStorageData.username
            if (
                typeof savedUsername === 'string' &&
                USER_NAME_PATTERN.test(savedUsername)
            ) {
                setUserName(savedUsername)
            } else {
                setItemInStorage('username', '')
            }

            const savedIsSigningUp = parsedStorageData.issigningup
            if (typeof savedIsSigningUp === 'boolean') {
                setIsSigningUp(savedIsSigningUp)
            } else {
                setItemInStorage('issigningup', false)
            }
        }
    }, [setIsSigningUp, setUserName])
}
