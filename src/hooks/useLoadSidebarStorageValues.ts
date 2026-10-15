'use client'

import { useEffect } from 'react'
import { getStoredSessionData, setItemInSessionStorage } from '@/utils'
import { useLoadSidebarStorageValuesProps } from '@/types'

export const useLoadSidebarStorageValues = ({
    setFilter,
}: useLoadSidebarStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()

        if (parsedSessionData) {
            const savedFilteredText = parsedSessionData?.filteredtext
            if (savedFilteredText && typeof savedFilteredText === 'string') {
                setFilter(savedFilteredText)
            } else {
                setItemInSessionStorage('filteredtext', '')
            }
        }
    }, [setFilter])
}
