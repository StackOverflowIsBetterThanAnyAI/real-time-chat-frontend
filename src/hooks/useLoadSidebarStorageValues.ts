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
            if (
                typeof savedFilteredText === 'string' &&
                savedFilteredText.length &&
                savedFilteredText.length <= 20
            ) {
                setFilter(savedFilteredText)
            } else {
                setItemInSessionStorage('filteredtext', '')
            }
        }
    }, [setFilter])
}
