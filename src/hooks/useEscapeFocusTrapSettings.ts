'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapSettingsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapSettings = ({
    isEditingStatus,
    isFriendsExpanded,
    profileButtonRef,
    profilePictureDetailsRef,
    setIsEditingStatus,
    setIsFriendsExpanded,
    setIsSettingsExpanded,
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

            if (isEditingStatus) {
                setIsEditingStatus(false)
                setItemInSessionStorage('iseditingstatus', false)
                return
            }

            setIsSettingsExpanded(false)
            setItemInSessionStorage('issettingsexpanded', false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (
                settingsRef.current &&
                !settingsRef.current.contains(e.target as Node) &&
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

                if (isEditingStatus) {
                    setIsEditingStatus(false)
                    setItemInSessionStorage('iseditingstatus', false)
                }

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
        isEditingStatus,
        isFriendsExpanded,
        profileButtonRef,
        profilePictureDetailsRef,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setIsSettingsExpanded,
        settingsRef,
    ])
}
