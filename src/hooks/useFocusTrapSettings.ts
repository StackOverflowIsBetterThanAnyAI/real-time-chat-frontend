'use client'

import { useEffect } from 'react'

export const useFocusTrapSettings = () => {
    return useEffect(() => {
        const focusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') {
                return
            }

            const focusableElements = Array.from(
                document.querySelectorAll<HTMLElement>('.settings-menu-button')
            ).filter((element) => {
                const detailsParent = element.closest('details')
                if (
                    detailsParent &&
                    !detailsParent.open &&
                    !element.matches('summary')
                ) {
                    return false
                }

                if (
                    element.hasAttribute('disabled') ||
                    (element as HTMLButtonElement).disabled
                ) {
                    return false
                }
            })

            if (!focusableElements.length || !document.activeElement) {
                return
            }

            const currentIndex = focusableElements.indexOf(
                document.activeElement as HTMLElement
            )

            if (currentIndex === -1) {
                e.preventDefault()
                focusableElements[0]?.focus()
                return
            }

            const firstFocusableElement = focusableElements[0]
            const lastFocusableElement =
                focusableElements[focusableElements.length - 1]

            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    e.preventDefault()
                    lastFocusableElement?.focus()
                } else {
                    e.preventDefault()
                    focusableElements[currentIndex - 1]?.focus()
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    e.preventDefault()
                    firstFocusableElement?.focus()
                } else {
                    e.preventDefault()
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
