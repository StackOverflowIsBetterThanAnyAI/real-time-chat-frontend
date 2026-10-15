'use client'

import { useCallback, useState } from 'react'
import {
    ContextChatFriendData,
    ContextFriends,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextLogout,
    ContextUserData,
    ToastProvider,
} from '@/context'
import { useLoadLoggedInStorageValues, useToast } from '@/hooks'
import { ChatFriendType, FriendType, UserDataProps } from '@/types'
import { resetStorage } from '@/utils'

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ToastProvider>
            <AppContent>{children}</AppContent>
        </ToastProvider>
    )
}

const AppContent = ({ children }: { children: React.ReactNode }) => {
    const [chatFriendData, setChatFriendData] = useState<
        ChatFriendType | undefined
    >(undefined)
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

    useLoadLoggedInStorageValues({ setIsLoggedIn, setIsSettingsExpanded })

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
                setChatFriendData,
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
        setChatFriendData,
        setFriendsData,
        setIsLoggedIn,
        setIsSettingsExpanded,
        setUserData,
        showToast,
    ])

    return (
        <ContextChatFriendData.Provider
            value={[chatFriendData, setChatFriendData]}
        >
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
        </ContextChatFriendData.Provider>
    )
}
