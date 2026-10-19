'use client'

import { useEffect } from 'react'
import { useLoadStatisticsStorageValuesProps } from '@/types'
import {
    checkIsStatisticsType,
    getStoredSessionData,
    setItemInSessionStorage,
} from '@/utils'

export const useLoadStatisticsStorageValues = ({
    setUserStatistics,
}: useLoadStatisticsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const savedUserStatistics = parsedSessionData?.userstatistics
            if (checkIsStatisticsType(savedUserStatistics)) {
                setUserStatistics(savedUserStatistics)
            } else {
                setItemInSessionStorage('userstatistics', null)
            }
        }
    }, [setUserStatistics])
}
