'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapEditingStatusProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapEditingStatus = ({
    setIsEditingStatus,
}: useEscapeFocusTrapEditingStatusProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return
            }
            setItemInSessionStorage('iseditingstatus', false)
            setIsEditingStatus(false)
        }
        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [setIsEditingStatus])
}
