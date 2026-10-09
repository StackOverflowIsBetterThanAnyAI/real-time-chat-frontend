'use client'

import { useEffect } from 'react'
import { useLoadSettingsStorageValuesProps, UserDataProps } from '@/types'
import {
    getStoredData,
    getStoredSessionData,
    setItemInSessionStorage,
    setItemInStorage,
} from '@/utils'

export const useLoadSettingsStorageValues = ({
    setInternalStatus,
    setIsEditingStatus,
    setIsFriendsExpanded,
    setUserData,
}: useLoadSettingsStorageValuesProps) => {
    return useEffect(() => {
        const parsedSessionData = getStoredSessionData()
        if (parsedSessionData) {
            const savedInternalStatus = parsedSessionData?.internalstatus
            if (
                typeof savedInternalStatus === 'string' &&
                savedInternalStatus.length <= 255
            ) {
                setInternalStatus(savedInternalStatus)
            } else {
                setItemInSessionStorage('internalstatus', '')
                setInternalStatus('')
            }

            const savedIsEditingStatus = parsedSessionData?.iseditingstatus
            if (typeof savedIsEditingStatus === 'boolean') {
                setIsEditingStatus(savedIsEditingStatus)
            } else {
                setItemInSessionStorage('iseditingstatus', false)
                setIsEditingStatus(false)
            }

            const savedIsFriendsExpanded = parsedSessionData?.isfriendsexpanded
            if (typeof savedIsFriendsExpanded === 'boolean') {
                setIsFriendsExpanded(savedIsFriendsExpanded)
            } else {
                setItemInSessionStorage('isfriendsexpanded', false)
                setIsFriendsExpanded(false)
            }
        }

        const parsedStorageData = getStoredData()
        if (parsedStorageData) {
            const internalUserData: UserDataProps = {
                profilePicture: null,
                status: '',
                userName: '',
            }
            const savedProfilePicture = parsedStorageData?.profilepicture
            if (
                typeof savedProfilePicture === 'string' &&
                savedProfilePicture.length <= 255
            ) {
                internalUserData.profilePicture = savedProfilePicture
            } else {
                setItemInStorage('profilepicture', null)
                internalUserData.profilePicture = null
            }
            const savedStatus = parsedStorageData?.status
            if (typeof savedStatus === 'string' && savedStatus.length <= 255) {
                internalUserData.status = savedStatus
            } else {
                setItemInStorage('status', '')
                internalUserData.status = ''
            }
            const savedUserName = parsedStorageData?.username
            if (
                typeof savedUserName === 'string' &&
                savedUserName.length >= 5 &&
                savedUserName.length <= 63
            ) {
                internalUserData.userName = savedUserName
            } else {
                setItemInStorage('username', '')
                internalUserData.userName = ''
            }
            setUserData(internalUserData)
        }
    }, [
        setInternalStatus,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setUserData,
    ])
}
