'use client'

import Image from 'next/image'
import { useContext, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { MdModeEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'
import { MdLogout } from 'react-icons/md'
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
                <aside className="settings-menu flex flex-col gap-2 absolute max-w-96 w-full top-16 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
                    <button className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 rounded-xl">
                        <IoMdClose />
                        <span>Close</span>
                    </button>
                    <div className="flex flex-col justify-center items-center mx-auto">
                        <Image
                            alt="profile picture"
                            src={profile_picure}
                            className="w-32 h-32 rounded-full outline-2 outline-zinc-100 m-2"
                        />
                        <h2 className="text-center text-large">
                            @Münzendieter
                        </h2>
                        <div className="triangle mx-auto h-0 w-0"></div>
                        <h3 className="text-normal bg-zinc-800 w-fit px-4 py-1 rounded-xl mx-auto">
                            Hey there, I'm using WhatsApp!
                        </h3>
                    </div>
                    <hr className="my-2 border-zinc-100" />
                    <div className="flex flex-col gap-2 justify-between h-full">
                        <div className="flex flex-col gap-2">
                            <button className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 rounded-xl">
                                <MdModeEdit />
                                <span>Edit Status</span>
                            </button>
                            <button className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 rounded-xl">
                                <FaUserFriends />
                                <span>Friends</span>
                            </button>
                            <button className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 rounded-xl">
                                <IoStatsChart />
                                <span>Statistics</span>
                            </button>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 outline-2 outline-red-800 rounded-xl"
                                onClick={() => {
                                    setIsLoggedIn(false)
                                }}
                            >
                                <MdLogout />
                                <span>Logout</span>
                            </button>
                            <button className="text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 outline-2 outline-red-800 rounded-xl">
                                <MdDeleteForever />
                                <span>Delete Account</span>
                            </button>
                        </div>
                    </div>
                </aside>
            )}
        </>
    )
}

export default Navigation
