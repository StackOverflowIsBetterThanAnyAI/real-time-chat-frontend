'use client'

import { useState } from 'react'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    ToastProvider,
} from '@/context'
import { useLoadLoggedInStorageValue } from '@/hooks'
import { FriendType, UserDataProps } from '@/types'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
    const [isSettingsExpanded, setIsSettingsExpanded] = useState<
        boolean | undefined
    >(false)
    const friendsState = useState<FriendType[] | undefined>(undefined)
    const userState = useState<UserDataProps | undefined>(undefined)

    useLoadLoggedInStorageValue({ setIsLoggedIn, setIsSettingsExpanded })

    return (
        <ContextFriends.Provider value={friendsState}>
            <ContextIsLoggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
                <ContextIsSettingsExpanded.Provider
                    value={[isSettingsExpanded, setIsSettingsExpanded]}
                >
                    <ContextUserData.Provider value={userState}>
                        <ToastProvider>{children}</ToastProvider>
                    </ContextUserData.Provider>
                </ContextIsSettingsExpanded.Provider>
            </ContextIsLoggedIn.Provider>
        </ContextFriends.Provider>
    )
}
