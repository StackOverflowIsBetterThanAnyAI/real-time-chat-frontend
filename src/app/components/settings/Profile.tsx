'use client'

import { FetchLoading } from 'fetch-loading'
import { useContext, useState } from 'react'
import { ProfilePicture } from '@/app/components/settings'
import { SettingsProfileProps } from '@/types'
import {
    handleRemoveProfilePictureApi,
    handleUploadProfilePictureApi,
} from '@/api'
import {
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    ContextUserData,
    useToast,
} from '@/context'
const Profile = ({
    isLoading,
    profilePicture,
    setIsLoading,
    userName,
}: SettingsProfileProps) => {
    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Profile must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Profile must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const contextUserData = useContext(ContextUserData)
    if (!contextUserData) {
        throw new Error(
            'Profile must be used within a ContextUserData.Provider'
        )
    }
    const [, setUserData] = contextUserData

    const { showToast } = useToast()

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        handleUploadProfilePictureApi({
            e,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
        setIsOpen(false)
    }
    const handleRemoveProfilePicture = async () => {
        handleRemoveProfilePictureApi({
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
        setIsOpen(false)
    }

    return (
        <div className="flex flex-col items-center">
            <details className="relative group" open={isOpen}>
                <summary
                    title="Manage Profile Picture"
                    className="settings-menu-button w-28 sm:w-32 h-28 sm:h-32 rounded-full outline-2 outline-zinc-100 relative
                    bg-linear-180 from-blue-500 to-blue-700 overflow-hidden focus-within:outline-4! block"
                >
                    {isLoading ? (
                        <span className="flex justify-center items-center h-full">
                            <FetchLoading theme="#f4f4f5" />
                        </span>
                    ) : (
                        <ProfilePicture
                            profilePicture={profilePicture}
                            size="large"
                        />
                    )}
                </summary>
                <div
                    className="absolute left-1/2 -translate-x-1/2 top-full -mt-2 w-40 bg-zinc-800
                    rounded-2xl p-1 z-10 flex flex-col gap-1 text-normal outline outline-zinc-500"
                >
                    <label
                        htmlFor="uploadProfilePicture"
                        className="settings-menu-button regular-button cursor-pointer hover:bg-zinc-700/60 active:bg-zinc-700 focus-visible:outline-2 outline-zinc-100"
                        onClick={() => {
                            setIsOpen((prev) => !prev)
                        }}
                        tabIndex={0}
                    >
                        Upload Image
                    </label>
                    <input
                        type="file"
                        id="uploadProfilePicture"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                    {profilePicture && (
                        <button
                            type="button"
                            className="settings-menu-button regular-button hover:bg-zinc-700/60 active:bg-zinc-700 text-red-400"
                            onClick={handleRemoveProfilePicture}
                        >
                            Remove Image
                        </button>
                    )}
                </div>
            </details>
            {userName ? (
                <h2 className="text-center text-large mt-1 max-w-full truncate whitespace-nowrap overflow-hidden">
                    @{userName}
                </h2>
            ) : (
                <span className="h-6 sm:h-7 w-24 animate-pulse rounded-3xl outline outline-zinc-500 mt-1"></span>
            )}
        </div>
    )
}

export default Profile
