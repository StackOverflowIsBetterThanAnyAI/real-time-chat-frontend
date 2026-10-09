'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapSettingsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapSettings = ({
    isEditingStatus,
    isFriendsExpanded,
    profilePictureDetailsRef,
    setIsEditingStatus,
    setIsFriendsExpanded,
    setIsSettingsExpanded,
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

        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [
        isEditingStatus,
        isFriendsExpanded,
        profilePictureDetailsRef,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setIsSettingsExpanded,
    ])
}
