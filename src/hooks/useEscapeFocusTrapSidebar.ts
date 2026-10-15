'use client'

import { RefObject, useEffect } from 'react'
import { setItemInSessionStorage } from '@/utils'
import { useEscapeFocusTrapSidebarProps } from '@/types'

export const useEscapeFocusTrapSidebar = ({
    isSidebarExpanded,
    setIsSidebarExpanded,
    sidebarRef,
}: useEscapeFocusTrapSidebarProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape' || !isSidebarExpanded) {
                return
            }

            setIsSidebarExpanded(false)
            setItemInSessionStorage('issidebarexpanded', false)
        }

        const handleClickOutside = (e: MouseEvent) => {
            if (!isSidebarExpanded) {
                return
            }

            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target as Node)
            ) {
                setIsSidebarExpanded(false)
                setItemInSessionStorage('issidebarexpanded', false)
            }
        }

        document.addEventListener('keydown', escapeFocusTrap)
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isSidebarExpanded, setIsSidebarExpanded, sidebarRef])
}
