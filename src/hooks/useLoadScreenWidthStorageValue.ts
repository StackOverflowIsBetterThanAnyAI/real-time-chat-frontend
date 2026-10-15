'use client'

import { useEffect } from 'react'
import { ScreenWidthType } from '@/types'
import { getStoredSessionData, setItemInSessionStorage } from '@/utils'

export type useLoadScreenWidthStorageValueProps = {
    setScreenWidth: React.Dispatch<React.SetStateAction<ScreenWidthType>>
}

export const useLoadScreenWidthStorageValue = ({
    setScreenWidth,
}: useLoadScreenWidthStorageValueProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const savedScreenWdith = parsedSessionData?.screenwidth
            if (
                typeof savedScreenWdith === 'string' &&
                ['MOBILE', 'NOT_MOBILE'].includes(savedScreenWdith)
            ) {
                setScreenWidth(savedScreenWdith as ScreenWidthType)
            } else {
                setItemInSessionStorage('screenwidth', 'MOBILE')
            }
        }
    }, [setScreenWidth])
}
