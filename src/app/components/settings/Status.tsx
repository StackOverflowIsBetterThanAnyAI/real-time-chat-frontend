'use client'

import { useContext, useState } from 'react'
import { FetchLoading } from 'fetch-loading'
import { handleUpdateStatusApi } from '@/api'
import { Message } from '@/app/components/error'
import {
    ContextFriends,
    ContextIsLoggedIn,
    ContextIsSettingsExpanded,
    useToast,
} from '@/context'
import { useEscapeFocusTrapEditingStatus } from '@/hooks'
import { SettingsStatusProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

const Status = ({
    currentStatus,
    handleIsEditingStatus,
    internalStatus,
    isEditingStatus,
    setInternalStatus,
    setIsEditingStatus,
    setUserData,
}: SettingsStatusProps) => {
    const contextFriends = useContext(ContextFriends)
    if (!contextFriends) {
        throw new Error('Status must be used within a ContextFriends.Provider')
    }
    const [, setFriendsData] = contextFriends

    const contextIsLoggedIn = useContext(ContextIsLoggedIn)
    if (!contextIsLoggedIn) {
        throw new Error(
            'Status must be used within a ContextIsLoggedIn.Provider'
        )
    }
    const [, setIsLoggedIn] = contextIsLoggedIn

    const contextIsSettingsExpanded = useContext(ContextIsSettingsExpanded)
    if (!contextIsSettingsExpanded) {
        throw new Error(
            'Status must be used within a ContextIsSettingsExpanded.Provider'
        )
    }
    const [, setIsSettingsExpanded] = contextIsSettingsExpanded

    const { showToast } = useToast()

    const [apiError, setApiError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEscapeFocusTrapEditingStatus({ setIsEditingStatus })

    const handleCancelStatus = () => {
        setIsEditingStatus(false)
        setInternalStatus(currentStatus)
        setItemInSessionStorage('internalstatus', currentStatus)
        setItemInSessionStorage('iseditingstatus', false)
        if (apiError) {
            setApiError('')
        }
    }
    const handleChangeStatus = (e: React.InputEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setInternalStatus(newValue)
        setItemInSessionStorage('internalstatus', newValue)
        if (apiError) {
            setApiError('')
        }
    }
    const handleConfirmStatus = () => {
        if (apiError) {
            setApiError('')
        }
        if (
            internalStatus.length &&
            internalStatus.length <= 255 &&
            internalStatus !== currentStatus
        ) {
            handleUpdateStatus()
        } else {
            setInternalStatus(currentStatus)
            setItemInSessionStorage('internalstatus', currentStatus)
            setItemInSessionStorage('iseditingstatus', false)
            setIsEditingStatus(false)
        }
    }
    const handleKeyDownStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleConfirmStatus()
        }
    }
    const handleUpdateStatus = async () => {
        await handleUpdateStatusApi({
            currentStatus,
            internalStatus,
            setApiError,
            setFriendsData,
            setIsEditingStatus,
            setInternalStatus,
            setIsLoading,
            setIsLoggedIn,
            setIsSettingsExpanded,
            setUserData,
            showToast,
        })
    }

    return (
        <>
            <div
                className={`${currentStatus ? '' : 'animate-pulse'} triangle mx-auto h-0 w-0`}
            ></div>
            {isLoading ? (
                <div className="bg-zinc-800 max-w-full w-fit h-7 sm:h-8 lg:h-9 px-4 py-1 rounded-xl mx-auto">
                    <FetchLoading theme="#f4f4f5" />
                </div>
            ) : isEditingStatus ? (
                <>
                    <input
                        className="text-normal bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl mx-auto mb-1"
                        value={internalStatus}
                        onInput={handleChangeStatus}
                        onKeyDown={handleKeyDownStatus}
                        id="status"
                        maxLength={255}
                        minLength={1}
                        title="The updated status must contain between 1 and 255 characters."
                        type="text"
                    />
                    <label htmlFor="status" className="sr-only">
                        Status
                    </label>
                    <Message error={apiError} />
                    <div className="flex gap-4 text-normal pt-2">
                        <button
                            onClick={handleCancelStatus}
                            className="settings-menu-button not-disabled:outline-2 outline-red-500 small-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmStatus}
                            className="settings-menu-button not-disabled:outline-2 outline-blue-600 small-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                            disabled={isLoading}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            ) : currentStatus ? (
                <h3
                    className="text-normal text-center bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl mx-auto"
                    onDoubleClick={handleIsEditingStatus}
                >
                    {currentStatus}
                </h3>
            ) : (
                <span className="animate-pulse bg-zinc-800 h-7 sm:h-8 lg:h-9 w-40 px-4 py-1 rounded-xl"></span>
            )}
        </>
    )
}

export default Status
