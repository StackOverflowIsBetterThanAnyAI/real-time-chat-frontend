'use client'

import { useContext, useState } from 'react'
import NavigationSettings from '@/app/components/navigation/NavigationSettings'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { ContextIsSettingsExpanded } from '@/context/ContextIsSettingsExpanded'
import { getStoredSessionData } from '@/utils/getStoredSessionData'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'
import NavigationProfilePicture from './NavigationProfilePicture'

const Navigation = () => {
    const parsedSessionData = getStoredSessionData()

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Navigation must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

    const [isSettingsExpanded, setIsSettingsExpanded] = useState<
        boolean | undefined
    >(() => {
        const data = parsedSessionData?.issettingsexpanded
        if (data && typeof data === 'boolean') {
            return data
        }
        setItemInSessionStorage('issettingsexpanded', false)
        return false
    })

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
                            <NavigationProfilePicture
                                profilePicture={undefined}
                                size="small"
                            />
                        </button>
                    )}
                </div>
            </nav>
            <ContextIsSettingsExpanded.Provider
                value={[isSettingsExpanded, setIsSettingsExpanded]}
            >
                {isSettingsExpanded && isLoggedIn && <NavigationSettings />}
            </ContextIsSettingsExpanded.Provider>
        </>
    )
}

export default Navigation
