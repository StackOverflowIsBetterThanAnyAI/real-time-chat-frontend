'use client'

import { useEffect } from 'react'
import { setItemInSessionStorage } from '@/utils'
import { useEscapeFocusTrapSidebarProps } from '@/types'

export const useEscapeFocusTrapSidebar = ({
    isSidebarExpanded,
    setFilter,
    setIsSidebarExpanded,
    sidebarRef,
}: useEscapeFocusTrapSidebarProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape' || !isSidebarExpanded) {
                return
            }

            setFilter('')
            setItemInSessionStorage('filteredtext', '')
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
                setFilter('')
                setItemInSessionStorage('filteredtext', '')
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
    }, [isSidebarExpanded, setFilter, setIsSidebarExpanded, sidebarRef])
}
