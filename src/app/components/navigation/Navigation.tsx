'use client'

import { useContext } from 'react'
import { ProfilePicture, Settings } from '@/app/components/settings'
import {
    ContextIsLoggedIn,
    ContextUserData,
    ContextIsSettingsExpanded,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
} from '@/context'
import { setItemInSessionStorage } from '@/utils'

const Navigation = () => {
    const contextIsEditingStatus = useContext(ContextIsEditingStatus)
    if (!contextIsEditingStatus) {
        throw new Error(
            'Navigation must be used within a ContextIsEditingStatus.Provider'
        )
    }
    const [, setIsEditingStatus] = contextIsEditingStatus

    const contextIsFriendsExpanded = useContext(ContextIsFriendsExpanded)
    if (!contextIsFriendsExpanded) {
        throw new Error(
            'Navigation must be used within a ContextIsFriendsExpanded.Provider'
        )
    }
    const [, setIsFriendsExpanded] = contextIsFriendsExpanded

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Navigation must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Navigation must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [isSettingsExpanded, setIsSettingsExpanded] =
        contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'Navigation must be used within a ContextUserData.Provider'
        )
    }
    const [userData] = contextUserData

    const handleClick = () => {
        setIsSettingsExpanded(() => {
            const newVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', newVal)
            return newVal
        })
        setIsEditingStatus(false)
        setItemInSessionStorage('iseditingstatus', false)
        setIsFriendsExpanded(false)
        setItemInSessionStorage('isfriendsexpanded', false)
    }

    return (
        <>
            <nav className="w-full bg-zinc-600 flex items-center justify-between px-2 sm:px-4 py-1">
                <div className="flex justify-between items-center gap-2 md:gap-4 w-full h-12 sm:h-16">
                    <h1 className="text-large">Dieter-Chat</h1>
                    {isLoggedIn && (
                        <button
                            onClick={handleClick}
                            className={`w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700
                            relative overflow-hidden ${userData === undefined ? ' animate-pulse' : ''}`}
                            title={`${isSettingsExpanded ? 'Close' : 'Open'} Settings`}
                        >
                            <ProfilePicture
                                profilePicture={userData?.profilePicture}
                                size="small"
                            />
                        </button>
                    )}
                </div>
            </nav>
            {isSettingsExpanded && isLoggedIn && <Settings />}
        </>
    )
}

export default Navigation
