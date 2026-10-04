'use client'

import { useContext } from 'react'
import { ProfilePicture, Settings } from '@/app/components/navigation'
import {
    ContextIsLoggedIn,
    ContextUserData,
    ContextIsSettingsExpanded,
} from '@/context'
import { setItemInSessionStorage } from '@/utils'

const Navigation = () => {
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
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }

    return (
        <>
            <nav className="w-full bg-zinc-600 flex items-center justify-between px-2 sm:px-4 py-1">
                <div className="flex justify-between items-center gap-2 md:gap-4 w-full h-16">
                    <h1 className="text-large">Dieter-Chat</h1>
                    {isLoggedIn && (
                        <button
                            onClick={handleClick}
                            className="w-12 h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden"
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
