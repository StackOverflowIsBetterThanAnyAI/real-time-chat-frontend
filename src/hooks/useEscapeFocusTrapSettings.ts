'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapSettingsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapSettings = ({
    isEditingStatus,
    isFriendsExpanded,
    setIsSettingsExpanded,
}: useEscapeFocusTrapSettingsProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape' || isEditingStatus || isFriendsExpanded) {
                return
            }

            setIsSettingsExpanded(false)
            setItemInSessionStorage('issettingsexpanded', false)
        }

        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [isEditingStatus, isFriendsExpanded, setIsSettingsExpanded])
}
