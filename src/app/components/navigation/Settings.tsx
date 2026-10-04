'use client'

import { FetchLoading } from 'fetch-loading'
import { useContext, useState } from 'react'
import { FaUserFriends } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoMdClose } from 'react-icons/io'
import { MdModeEdit, MdDeleteForever, MdLogout } from 'react-icons/md'
import {
    ProfilePicture,
    SettingsButton,
    SettingsStatus,
} from '@/app/components/navigation'
import { handleUploadProfilePictureApi } from '@/api'
import {
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
import {
    useEscapeFocusTrapNavigationSettings,
    useFocusTrapNavigationSettings,
} from '@/hooks'
import userMockData from '@/mock/userMockData.json'
import { handleLogout, setItemInSessionStorage } from '@/utils'

const Settings = () => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Settings must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [isLoggedIn, setIsLoggedIn] = contextIsLoggedIn

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
    const [isEditingStatus, setIsEditingStatus] = useState<boolean>(false)

    const currentStatus = userData?.status || userMockData.status

    useEscapeFocusTrapNavigationSettings({
        isEditingStatus,
        setIsSettingsExpanded,
    })
    useFocusTrapNavigationSettings()

    const handleIsEditingStatus = () => {
        setIsEditingStatus(true)
        setInternalStatus(currentStatus)
    }
    const handleToggleIsSettingsExpanded = () => {
        setIsSettingsExpanded(() => {
            const nextVal = !isSettingsExpanded
            setItemInSessionStorage('issettingsexpanded', nextVal)
            return nextVal
        })
    }

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUploadProfilePictureApi({
            e,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }

    return (
        <aside className="flex flex-col gap-2 absolute max-w-96 w-full top-18 right-0 bottom-4 bg-zinc-700 p-4 border-2 border-zinc-800 rounded-b-xl overflow-y-auto">
            <SettingsButton
                handleClick={handleToggleIsSettingsExpanded}
                label="Close"
                icon={<IoMdClose />}
            />
            <div className="flex flex-col justify-center items-center mx-auto">
                <label
                    htmlFor="uploadProfilePicture"
                    title="Upload a new profile picture"
                    className="w-32 h-32 rounded-full outline-2 outline-zinc-100 bg-linear-180 from-blue-500 to-blue-700
                        relative overflow-hidden focus-within:outline-4 hover:cursor-pointer"
                >
                    <input
                        type="file"
                        id="uploadProfilePicture"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        className="settings-menu-button w-full h-full sr-only"
                    />
                    {isLoading ? (
                        <span className="flex justify-center items-center h-full">
                            <FetchLoading theme="#f4f4f5" />
                        </span>
                    ) : (
                        <ProfilePicture
                            profilePicture={userData?.profilePicture}
                            size="large"
                        />
                    )}
                </label>
                <h2 className="text-center text-large">
                    @{userData?.userName || userMockData.userName}
                </h2>
                <div className="triangle mx-auto h-0 w-0"></div>
                <SettingsStatus
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
                    <SettingsButton
                        handleClick={handleIsEditingStatus}
                        isClicked={isEditingStatus}
                        isClickedLabel="Editing Status"
                        label="Edit Status"
                        icon={<MdModeEdit />}
                    />
                    <SettingsButton
                        handleClick={() => {}}
                        label="Friends"
                        icon={<FaUserFriends />}
                    />
                    <SettingsButton
                        handleClick={() => {}}
                        label="Statistics"
                        icon={<IoStatsChart />}
                    />
                </div>
                <div className="flex flex-col gap-4">
                    <SettingsButton
                        handleClick={() =>
                            handleLogout({
                                setIsLoggedIn,
                                setIsSettingsExpanded,
                            })
                        }
                        label="Logout"
                        icon={<MdLogout />}
                        isDelete
                    />
                    <SettingsButton
                        handleClick={() => {}}
                        label="Delete Account"
                        icon={<MdDeleteForever />}
                        isDelete
                    />
                </div>
            </div>
        </aside>
    )
}

export default Settings
