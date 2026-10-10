'use client'

import { useContext, useEffect, useRef, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import { MdModeEdit, MdDeleteForever, MdLogout } from 'react-icons/md'
import { handleLogoutApi, handleDeleteAccountApi } from '@/api'
import {
    Button,
    Friends,
    Header,
    Profile,
    Status,
} from '@/app/components/settings'
import {
    ContextFriends,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
import {
    useEscapeFocusTrapSettings,
    useFocusTrapSettings,
    useLoadSettingsStorageValues,
} from '@/hooks'
import { setItemInSessionStorage } from '@/utils'

const Settings = () => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error(
            'Settings must be used within a ContextFriends.Provider'
        )
    }
    const [, setFriendsData] = contextFriends

    const contextIsEditingStatus = useContext(ContextIsEditingStatus)
    if (!contextIsEditingStatus) {
        throw new Error(
            'Settings must be used within a ContextIsEditingStatus.Provider'
        )
    }
    const [isEditingStatus, setIsEditingStatus] = contextIsEditingStatus

    const contextIsFriendsExpanded = useContext(ContextIsFriendsExpanded)
    if (!contextIsFriendsExpanded) {
        throw new Error(
            'Settings must be used within a ContextIsFriendsExpanded.Provider'
        )
    }
    const [isFriendsExpanded, setIsFriendsExpanded] = contextIsFriendsExpanded

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

    const { showToast } = useToast()

    const [internalStatus, setInternalStatus] = useState<string>('')
    const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)

    const profilePictureDetailsRef = useRef<HTMLDetailsElement>(null)

    const currentStatus = userData?.status || ''

    useLoadSettingsStorageValues({
        setInternalStatus,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setUserData,
    })
    useEscapeFocusTrapSettings({
        isEditingStatus,
        isFriendsExpanded,
        profilePictureDetailsRef,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setIsSettingsExpanded,
    })
    useFocusTrapSettings()

    const handleDeleteAccount = async () => {
        if (isDeleteAccount) {
            setIsLoadingDelete(true)
            await handleDeleteAccountApi({
                setFriendsData,
                setIsLoading,
                setIsLoggedIn,
                setIsSettingsExpanded,
                setUserData,
                showToast,
            })
        }
        setIsDeleteAccount((prev) => !prev)
    }
    const handleIsEditingStatus = () => {
        setIsEditingStatus(true)
        setItemInSessionStorage('iseditingstatus', true)
        setInternalStatus(currentStatus)
        setItemInSessionStorage('internalstatus', currentStatus)
    }
    const handleLogout = async () => {
        setIsLoadingLogout(true)
        await handleLogoutApi({
            setFriendsData,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
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

    const [deleteCountdown, setDeleteCountdown] = useState(5)

    useEffect(() => {
        if (!isDeleteAccount) {
            setDeleteCountdown(5)
            return
        }

        const startedAt = Date.now()

        const updateCountdown = () => {
            const elapsed = (Date.now() - startedAt) / 1000
            const remaining = Math.max(0, 5 - elapsed)

            setDeleteCountdown(Math.ceil(remaining))

            if (remaining <= 0) {
                setIsDeleteAccount(false)
            }
        }

        updateCountdown()

        const interval = setInterval(updateCountdown, 50)

        return () => clearInterval(interval)
    }, [isDeleteAccount])

    return (
        <aside className="z-10 flex flex-col gap-2 absolute max-w-96 w-full top-14 sm:top-18 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
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
                            profilePictureDetailsRef={profilePictureDetailsRef}
                            setIsEditingStatus={setIsEditingStatus}
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
                                handleClick={handleLogout}
                                label="Logout"
                                icon={<MdLogout />}
                                isDelete
                                isLoading={isLoadingLogout}
                            />
                            <Button
                                handleClick={handleDeleteAccount}
                                label={`${isDeleteAccount ? `Confirm Deletion (${deleteCountdown}s)` : 'Delete Account'}`}
                                icon={<MdDeleteForever />}
                                isConfirmingDelete={isDeleteAccount}
                                isDelete
                                isLoading={isLoadingDelete}
                            />
                        </div>
                    </div>
                </>
            )}
        </aside>
    )
}

export default Settings
