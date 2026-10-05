'use client'

import { useEffect } from 'react'
import { useEscapeFocusTrapFriendsProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const useEscapeFocusTrapFriends = ({
    setIsFriendsExpanded,
}: useEscapeFocusTrapFriendsProps) => {
    useEffect(() => {
        const escapeFocusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') {
                return
            }

            setIsFriendsExpanded(false)
            setItemInSessionStorage('isfriendsexpanded', false)
        }

        document.addEventListener('keydown', escapeFocusTrap)

        return () => {
            document.removeEventListener('keydown', escapeFocusTrap)
        }
    }, [setIsFriendsExpanded])
}
