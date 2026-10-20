'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapSettingsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapSettings = ({
    addFriendRef,
    isEditingStatus,
    isFriendsExpanded,
    isStatisticsExpanded,
    profileButtonRef,
    profilePictureDetailsRef,
    setIsDetailsExpanded,
    setIsEditingStatus,
    setIsFriendsExpanded,
    setIsSettingsExpanded,
    setIsStatisticsExpanded,
    settingsRef,
}: useEscapeFocusTrapSettingsProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return
            }

            if (profilePictureDetailsRef?.current?.open) {
                profilePictureDetailsRef.current.open = false
                return
            }

            if (isFriendsExpanded) {
                setIsFriendsExpanded(false)
                setItemInSessionStorage('isfriendsexpanded', false)
                return
            }

            if (isStatisticsExpanded) {
                setIsStatisticsExpanded(false)
                setItemInSessionStorage('isstatisticsexpanded', false)
                return
            }

            if (isEditingStatus) {
                setIsEditingStatus(false)
                setItemInSessionStorage('iseditingstatus', false)
                return
            }

            const fallbackIsDetailsExpanded = {
                addFriend: false,
                friendsOverview: true,
                pendingFriends: false,
            }
            setIsDetailsExpanded(fallbackIsDetailsExpanded)
            setItemInSessionStorage(
                'isdetailsexpanded',
                fallbackIsDetailsExpanded
            )
            setIsSettingsExpanded(false)
            setItemInSessionStorage('issettingsexpanded', false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(e.target as Node) &&
                !addFriendRef?.current?.contains(e.target as Node) &&
                !profileButtonRef?.current?.contains(e.target as Node)
            ) {
                if (profilePictureDetailsRef?.current?.open) {
                    profilePictureDetailsRef.current.open = false
                    return
                }

                if (isFriendsExpanded) {
                    setIsFriendsExpanded(false)
                    setItemInSessionStorage('isfriendsexpanded', false)
                }

                if (isStatisticsExpanded) {
                    setIsStatisticsExpanded(false)
                    setItemInSessionStorage('isstatisticsexpanded', false)
                }

                if (isEditingStatus) {
                    setIsEditingStatus(false)
                    setItemInSessionStorage('iseditingstatus', false)
                }

                const fallbackIsDetailsExpanded = {
                    addFriend: false,
                    friendsOverview: true,
                    pendingFriends: false,
                }
                setIsDetailsExpanded(fallbackIsDetailsExpanded)
                setItemInSessionStorage(
                    'isdetailsexpanded',
                    fallbackIsDetailsExpanded
                )
                setIsSettingsExpanded(false)
                setItemInSessionStorage('issettingsexpanded', false)
            }
        }

        document.addEventListener('keydown', escapeFocusTrap)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [
        addFriendRef,
        isEditingStatus,
        isFriendsExpanded,
        isStatisticsExpanded,
        profileButtonRef,
        profilePictureDetailsRef,
        setIsDetailsExpanded,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setIsSettingsExpanded,
        setIsStatisticsExpanded,
        settingsRef,
    ])
}
