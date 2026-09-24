'use client'

import { useEffect } from 'react'

export const useFocusTrapNavigationSettings = () => {
    return useEffect(() => {
        const focusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') {
                return
            }

            const focusableElements: HTMLButtonElement[] = Array.from(
                document.querySelectorAll('.settings-menu-button')
            )

            if (
                !document.activeElement ||
                !focusableElements.includes(
                    document.activeElement as HTMLButtonElement
                )
            ) {
                return
            }

            const firstFocusableElement =
                focusableElements[0] as HTMLButtonElement

            const lastFocusableElement = focusableElements[
                focusableElements.length - 1
            ] as HTMLButtonElement

            const findCurrentButtonIndex = (button: HTMLButtonElement) => {
                return focusableElements.indexOf(button)
            }

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault()
                    lastFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    const currentIndex = findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                    focusableElements[currentIndex - 1]?.focus()
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    const currentIndex = findCurrentButtonIndex(
                        document.activeElement as HTMLButtonElement
                    )
                    focusableElements[currentIndex + 1]?.focus()
                }
            }
        }

        document.addEventListener('keydown', focusTrap)

        return () => {
            document.removeEventListener('keydown', focusTrap)
        }
    }, [])
}
