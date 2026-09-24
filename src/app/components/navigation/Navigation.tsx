'use client'

import Image from 'next/image'
import { useContext, useState } from 'react'
import profile_picure from '@/assets/profile_picture.jpg'
import { ContextIsLoggedIn } from '@/context/ContexIsLoggedIn'
import { getStoredSessionData } from '@/utils/getStoredSessionData'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

const Navigation = () => {
    const parsedSessionData = getStoredSessionData()

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Navigation must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

    const [isSettingsExpanded, setIsSettingsExpanded] = useState<boolean>(
        () => {
            const data = parsedSessionData?.issettingsexpanded
            if (data && typeof data === 'boolean') {
                return data
            }
            setItemInSessionStorage('issettingsexpanded', false)
            return false
        }
    )

    const handleClick = () => {
        setIsSettingsExpanded(() => {
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }

    return (
        <>
            <nav className="w-full bg-zinc-600 flex items-center justify-between h-16 px-2 sm:px-4 py-1 md:py-2">
                <div className="flex justify-between items-center gap-2 md:gap-4 w-full">
                    <h1 className="text-large">Dieter-Chat</h1>
                    {isLoggedIn && (
                        <button onClick={handleClick}>
                            <Image
                                alt="profile picture"
                                src={profile_picure}
                                className="w-12 h-12 rounded-full outline-2 outline-zinc-100"
                            />
                        </button>
                    )}
                </div>
            </nav>
            {isSettingsExpanded && isLoggedIn && (
                <aside className="absolute max-w-96 w-full top-16 right-0 bottom-4 bg-zinc-700 p-2 border-2 border-zinc-800 rounded-b-xl">
                    Hello World!
                </aside>
            )}
        </>
    )
}

export default Navigation
