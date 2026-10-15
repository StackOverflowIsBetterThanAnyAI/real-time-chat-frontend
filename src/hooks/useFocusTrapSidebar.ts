'use client'

import { useEffect } from 'react'
import { useFocusTrapSidebarProps } from '@/types'

export const useFocusTrapSidebar = ({ isActive }: useFocusTrapSidebarProps) => {
    return useEffect(() => {
        const focusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab' || !isActive) {
                return
            }

            const focusableElements = Array.from(
                document.querySelectorAll<HTMLElement>('.sidebar-button')
            )

            if (
                !document.activeElement ||
                !focusableElements.includes(
                    document.activeElement as HTMLElement
                )
            ) {
                return
            }

            const firstFocusableElement = focusableElements[0] as HTMLElement
            const lastFocusableElement = focusableElements[
                focusableElements.length - 1
            ] as HTMLElement

            const findCurrentButtonIndex = (button: HTMLElement) => {
                return focusableElements.indexOf(button)
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault()
                    lastFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    focusableElements[
                        findCurrentButtonIndex(
                            document.activeElement as HTMLElement
                        ) - 1
                    ]?.focus()
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    focusableElements[
                        findCurrentButtonIndex(
                            document.activeElement as HTMLElement
                        ) + 1
                    ]?.focus()
                }
            }
        }

        document.addEventListener('keydown', focusTrap)

        return () => {
            document.removeEventListener('keydown', focusTrap)
        }
    }, [isActive])
}
