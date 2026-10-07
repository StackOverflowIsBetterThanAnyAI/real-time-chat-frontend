'use client'

import { useEffect } from 'react'

export const useFocusTrapSettings = () => {
    return useEffect(() => {
        const focusTrap = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') {
                return
            }
            const isInClosedDetails = (el: HTMLElement): boolean => {
                let parent = el.parentElement
                let isSummary = el.tagName === 'SUMMARY'

                while (parent) {
                    if (parent.tagName === 'DETAILS') {
                        const isOpen = (parent as HTMLDetailsElement).open
                        if (!isOpen) {
                            if (isSummary) {
                                isSummary = false
                            } else {
                                return true
                            }
                        }
                    }
                    parent = parent.parentElement
                }
                return false
            }

            const focusableElements = Array.from(
                document.querySelectorAll<HTMLElement>('.settings-menu-button')
            ).filter((item) => {
                if (
                    'disabled' in item &&
                    (item as HTMLButtonElement).disabled
                ) {
                    return false
                }
                if (isInClosedDetails(item)) {
                    return false
                }
                return true
            })

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
    }, [])
}
