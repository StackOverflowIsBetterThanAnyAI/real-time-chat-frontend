'use client'

import { useContext, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import { MdModeEdit, MdDeleteForever, MdLogout } from 'react-icons/md'
import {
    Button,
    Friends,
    Header,
    Profile,
    Status,
} from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
} from '@/context'
import {
    useEscapeFocusTrapFriends,
    useEscapeFocusTrapSettings,
    useFocusTrapSettings,
    useLoadSettingsStorageValues,
} from '@/hooks'
import { handleLogout, setItemInSessionStorage } from '@/utils'

const Settings = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'Settings must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Settings must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Settings must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [isSettingsExpanded, setIsSettingsExpanded] =
        contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'Settings must be used within a ContextUserData.Provider'
        )
    }
    const [userData, setUserData] = contextUserData

    const [internalStatus, setInternalStatus] = useState<string>('')
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false)
    const [isFriendsExpanded, setIsFriendsExpanded] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const currentStatus = userData?.status || ''

    useEscapeFocusTrapFriends({ setIsFriendsExpanded })
    useEscapeFocusTrapSettings({
        isEditingStatus,
        isFriendsExpanded,
        setIsSettingsExpanded,
    })
    useFocusTrapSettings()
    useLoadSettingsStorageValues({ setIsEditingStatus, setIsFriendsExpanded })

    const handleIsEditingStatus = () => {
        setIsEditingStatus(true)
        setItemInSessionStorage('iseditingstatus', true)
        setInternalStatus(currentStatus)
    }
    const handleToggleIsSettingsExpanded = () => {
        setIsSettingsExpanded(() => {
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }
    const handleToggleIsFriendsExpanded = () => {
        setIsFriendsExpanded(() => {
            const nextVal = !isFriendsExpanded
            setItemInSessionStorage('isfriendsexpanded', nextVal)
            return nextVal
        })
    }

    return (
        <aside className="flex flex-col gap-2 absolute max-w-96 w-full top-14 sm:top-18 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
            {isFriendsExpanded ? (
                <>
                    <Header header="Friends" />
                    <Button
                        handleClick={handleToggleIsFriendsExpanded}
                        label="Go back to Settings"
                        icon={<IoMdArrowRoundBack />}
                    />
                    <Friends />
                </>
            ) : (
                <>
                    <Header header="Settings" />
                    <Button
                        handleClick={handleToggleIsSettingsExpanded}
                        label="Close"
                        icon={<IoMdClose />}
                    />
                    <div className="flex flex-col justify-center items-center mx-auto w-full">
                        <Profile
                            isLoading={isLoading}
                            profilePicture={userData?.profilePicture}
                            setIsLoading={setIsLoading}
                            userName={userData?.userName}
                        />
                        <Status
                            currentStatus={currentStatus}
                            handleIsEditingStatus={handleIsEditingStatus}
                            internalStatus={internalStatus}
                            isEditingStatus={isEditingStatus}
                            setInternalStatus={setInternalStatus}
                            setIsEditingStatus={setIsEditingStatus}
                            setUserData={setUserData}
                        />
                    </div>
                    <hr className="my-2 border-zinc-100" />
                    <div className="flex flex-col gap-2 justify-between h-full">
                        <div className="flex flex-col gap-2">
                            <Button
                                handleClick={handleIsEditingStatus}
                                isClicked={isEditingStatus}
                                isClickedLabel="Editing Status"
                                label="Edit Status"
                                icon={<MdModeEdit />}
                            />
                            <Button
                                handleClick={handleToggleIsFriendsExpanded}
                                label="Friends"
                                icon={<FaUserFriends />}
                            />
                            <Button
                                handleClick={() => {}}
                                label="Statistics"
                                icon={<IoStatsChart />}
                            />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Button
                                handleClick={() =>
                                    handleLogout({
                                        setFriendsData,
                                        setIsLoggedIn,
                                        setIsSettingsExpanded,
                                        setUserData,
                                    })
                                }
                                label="Logout"
                                icon={<MdLogout />}
                                isDelete
                            />
                            <Button
                                handleClick={() => {}}
                                label="Delete Account"
                                icon={<MdDeleteForever />}
                                isDelete
                            />
                        </div>
                    </div>
                </>
            )}
        </aside>
    )
}

export default Settings
