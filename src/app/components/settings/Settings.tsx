'use client'

import { useContext, useRef, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdArrowRoundBack, IoMdClose } from 'react-icons/io'
import { MdModeEdit, MdDeleteForever, MdLogout } from 'react-icons/md'
import { handleDeleteAccountApi } from '@/api'
import {
    Button,
    Friends,
    Header,
    Profile,
    Status,
} from '@/app/components/settings'
import {
    ContextAddFriendRef,
    ContextFriends,
    ContextIsEditingStatus,
    ContextIsFriendsExpanded,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
} from '@/context'
import {
    useEscapeFocusTrapSettings,
    useFocusTrapSettings,
    useIsDeleteCountdown,
    useLoadSettingsStorageValues,
    useLogout,
    useToast,
} from '@/hooks'
import { setItemInSessionStorage } from '@/utils'
import { SettingsProps } from '@/types'

const Settings = ({ profileButtonRef }: SettingsProps) => {
    const contextAddFriendRef = useContext(ContextAddFriendRef)
    if (!contextAddFriendRef) {
        throw new Error(
            'Settings must be used within a ContextAddFriendRef.Provider'
        )
    }
    const addFriendRef = contextAddFriendRef

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

    const { logout } = useLogout()
    const { showToast } = useToast()

    const [deleteCountdown, setDeleteCountdown] = useState<number>(5)
    const [internalStatus, setInternalStatus] = useState<string>('')
    const [isDeleteAccount, setIsDeleteAccount] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false)
    const [isLoadingLogout, setIsLoadingLogout] = useState<boolean>(false)

    const profilePictureDetailsRef = useRef<HTMLDetailsElement>(null)
    const settingsRef = useRef<HTMLElement>(null)

    const currentStatus = userData?.status || ''

    useLoadSettingsStorageValues({
        setInternalStatus,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setUserData,
    })
    useEscapeFocusTrapSettings({
        addFriendRef,
        isEditingStatus,
        isFriendsExpanded,
        profileButtonRef,
        profilePictureDetailsRef,
        setIsEditingStatus,
        setIsFriendsExpanded,
        setIsSettingsExpanded,
        settingsRef,
    })
    useFocusTrapSettings()
    useIsDeleteCountdown({
        isDeleteAccount,
        setDeleteCountdown,
        setIsDeleteAccount,
    })

    const handleDeleteAccount = async () => {
        if (isDeleteAccount) {
            setIsLoadingDelete(true)
            await handleDeleteAccountApi({
                logout,
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
        await logout()
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
        <aside
            className="z-20 flex flex-col gap-2 absolute max-w-96 w-full top-14 sm:top-18 right-0 bottom-4
            bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto"
            ref={settingsRef}
        >
            {isFriendsExpanded ? (
                <div className="flex flex-col gap-2">
                    <Header header="Friends" />
                    <Button
                        handleClick={handleToggleIsFriendsExpanded}
                        label="Go back to Settings"
                        icon={<IoMdArrowRoundBack color="#f4f4f5" />}
                    />
                    <Friends />
                </div>
            ) : (
                <>
                    <Header header="Settings" />
                    <Button
                        handleClick={handleToggleIsSettingsExpanded}
                        label="Close"
                        icon={
                            <IoMdClose
                                color="#f4f4f5"
                                className="h-4 sm:h-5 w-4 sm:w-5"
                            />
                        }
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
                    <div className="flex flex-col flex-1 gap-2">
                        <div className="flex flex-col gap-2">
                            <Button
                                handleClick={handleIsEditingStatus}
                                isClicked={isEditingStatus}
                                isClickedLabel="Editing Status"
                                label="Edit Status"
                                icon={
                                    <MdModeEdit
                                        color="#f4f4f5"
                                        className="h-4 sm:h-5 w-4 sm:w-5"
                                    />
                                }
                            />
                            <Button
                                handleClick={handleToggleIsFriendsExpanded}
                                label="Friends"
                                icon={
                                    <FaUserFriends
                                        color="#f4f4f5"
                                        className="h-4 sm:h-5 w-4 sm:w-5"
                                    />
                                }
                            />
                            <Button
                                handleClick={() => {}}
                                label="Statistics"
                                icon={
                                    <IoStatsChart
                                        color="#f4f4f5"
                                        className="h-4 sm:h-5 w-4 sm:w-5"
                                    />
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-4 mt-auto">
                            <Button
                                handleClick={handleLogout}
                                label="Logout"
                                icon={
                                    <MdLogout
                                        color="#f4f4f5"
                                        className="h-4 sm:h-5 w-4 sm:w-5"
                                    />
                                }
                                isDelete
                                isLoading={isLoadingLogout}
                            />
                            <Button
                                handleClick={handleDeleteAccount}
                                label={`${isDeleteAccount ? `Confirm Deletion (${deleteCountdown}s)` : 'Delete Account'}`}
                                icon={
                                    <MdDeleteForever
                                        color="#f4f4f5"
                                        className="h-4 sm:h-5 w-4 sm:w-5"
                                    />
                                }
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
