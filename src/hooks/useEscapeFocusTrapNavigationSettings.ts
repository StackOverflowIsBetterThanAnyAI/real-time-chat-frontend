'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapNavigationSettingsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapNavigationSettings = ({
    isEditingStatus,
    setIsSettingsExpanded,
}: useEscapeFocusTrapNavigationSettingsProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape' || isEditingStatus) {
                return
            }

            setIsSettingsExpanded(false)
            setItemInSessionStorage('issettingsexpanded', false)
        }

        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [isEditingStatus, setIsSettingsExpanded])
}
