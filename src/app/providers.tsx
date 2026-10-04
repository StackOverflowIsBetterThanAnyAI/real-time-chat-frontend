'use client'

import { useState } from 'react'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextIsSettingsExpanded } from '@/context/ContextIsSettingsExpanded'
import { ToastProvider } from '@/context/ContextToast'
import { ContextUserData } from '@/context/ContextUserData'
import { useLoadLoggedInStorageValue } from '@/hooks/useLoadLoggedInStorageValue'
import { UserDataProps } from '@/types/types'

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
