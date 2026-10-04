'use client'

import { useState } from 'react'
import {
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    ToastProvider,
} from '@/context'
import { useLoadLoggedInStorageValue } from '@/hooks'
import { UserDataProps } from '@/types'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
    const [isSettingsExpanded, setIsSettingsExpanded] = useState<
        boolean | undefined
    >(false)
    const userState = useState<UserDataProps | undefined>(undefined)

    useLoadLoggedInStorageValue({ setIsLoggedIn, setIsSettingsExpanded })

    return (
        <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
            <ContextIsSettingsExpanded.Provider
                value={[isSettingsExpanded, setIsSettingsExpanded]}
            >
                <ContextUserData.Provider value={userState}>
                    <ToastProvider>{children}</ToastProvider>
                </ContextUserData.Provider>
            </ContextIsSettingsExpanded.Provider>
        </ContextIsLoggedIn.Provider>
    )
}
