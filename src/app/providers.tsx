'use client'

import { useState } from 'react'
import {
    ContextFriends,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    ToastProvider,
} from '@/context'
import { useLoadLoggedInStorageValue } from '@/hooks'
import { FriendType, UserDataProps } from '@/types'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    const [isEditingStatus, setIsEditingStatus] = useState<boolean | undefined>(
        false
    )
    const [isFriendsExpanded, setIsFriendsExpanded] = useState<
        boolean | undefined
    >(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(false)
    const [isSettingsExpanded, setIsSettingsExpanded] = useState<
        boolean | undefined
    >(false)
    const friendsState = useState<FriendType[] | undefined>(undefined)
    const userState = useState<UserDataProps | undefined>(undefined)

    useLoadLoggedInStorageValue({ setIsLoggedIn, setIsSettingsExpanded })

    return (
        <ContextFriends.Provider value={friendsState}>
            <ContextIsEditingStatus.Provider
                value={[isEditingStatus, setIsEditingStatus]}
            >
                <ContextIsFriendsExpanded.Provider
                    value={[isFriendsExpanded, setIsFriendsExpanded]}
                >
                    <ContextIsLoggedIn.Provider
                        value={[isLoggedIn, setIsLoggedIn]}
                    >
                        <ContextIsSettingsExpanded.Provider
                            value={[isSettingsExpanded, setIsSettingsExpanded]}
                        >
                            <ContextUserData.Provider value={userState}>
                                <ToastProvider>{children}</ToastProvider>
                            </ContextUserData.Provider>
                        </ContextIsSettingsExpanded.Provider>
                    </ContextIsLoggedIn.Provider>
                </ContextIsFriendsExpanded.Provider>
            </ContextIsEditingStatus.Provider>
        </ContextFriends.Provider>
    )
}
