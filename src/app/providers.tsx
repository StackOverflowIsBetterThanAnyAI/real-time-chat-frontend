'use client'

import { useCallback, useState } from 'react'
import {
    ContextFriends,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextLogout,
    ContextUserData,
    ToastProvider,
} from '@/context'
import { useLoadLoggedInStorageValue, useToast } from '@/hooks'
import { FriendType, UserDataProps } from '@/types'
import { resetStorage } from '@/utils'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastProvider>
            <AppContent>{children}</AppContent>
        </ToastProvider>
    )
}

const AppContent = ({ children }: { children: React.ReactNode }) => {
    const [friendsData, setFriendsData] = useState<FriendType[] | undefined>(
        undefined
    )
    const [isEditingStatus, setIsEditingStatus] = useState<boolean | undefined>(
        false
    )
    const [isFriendsExpanded, setIsFriendsExpanded] = useState<
        boolean | undefined
    >(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined)
    const [isSettingsExpanded, setIsSettingsExpanded] = useState<
        boolean | undefined
    >(false)
    const [userData, setUserData] = useState<UserDataProps | undefined>(
        undefined
    )

    const { showToast } = useToast()

    useLoadLoggedInStorageValue({ setIsLoggedIn, setIsSettingsExpanded })

    const logout = useCallback(async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/logout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })

            if (!response.ok) {
                const error = await response.json()
                if (response.status >= 400 && response.status < 500) {
                    showToast({
                        label: `Could not logout user. ${error.error}`,
                    })
                } else if (response.status >= 500) {
                    showToast({
                        label: 'Could not logout user. Please try again.',
                    })
                }
                return
            }

            resetStorage({
                setFriendsData,
                setIsLoggedIn,
                setIsSettingsExpanded,
                setUserData,
            })
        } catch (error) {
            console.error(
                'An unexpected error occurred while trying to logout',
                error
            )
            showToast({ label: 'Could not logout user. Please try again.' })
        }
    }, [
        setFriendsData,
        setIsLoggedIn,
        setIsSettingsExpanded,
        setUserData,
        showToast,
    ])

    return (
        <ContextFriends.Provider value={[friendsData, setFriendsData]}>
            <ContextIsEditingStatus.Provider
                value={[isEditingStatus, setIsEditingStatus]}
            >
                <ContextIsFriendsExpanded.Provider
                    value={[isFriendsExpanded, setIsFriendsExpanded]}
                >
                    <ContextIsLoggedIn.Provider
                        value={[isLoggedIn, setIsLoggedIn]}
                    >
                        <ContextLogout.Provider value={{ logout }}>
                            <ContextIsSettingsExpanded.Provider
                                value={[
                                    isSettingsExpanded,
                                    setIsSettingsExpanded,
                                ]}
                            >
                                <ContextUserData.Provider
                                    value={[userData, setUserData]}
                                >
                                    {children}
                                </ContextUserData.Provider>
                            </ContextIsSettingsExpanded.Provider>
                        </ContextLogout.Provider>
                    </ContextIsLoggedIn.Provider>
                </ContextIsFriendsExpanded.Provider>
            </ContextIsEditingStatus.Provider>
        </ContextFriends.Provider>
    )
}
