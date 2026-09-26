'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapNavigationSettingsProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const useEscapeFocusTrapNavigationSettings = ({
    setIsSettingsExpanded,
}: useEscapeFocusTrapNavigationSettingsProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return
            }

            setIsSettingsExpanded(false)
            setItemInSessionStorage('issettingsexpanded', false)
        }

        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [])
}
