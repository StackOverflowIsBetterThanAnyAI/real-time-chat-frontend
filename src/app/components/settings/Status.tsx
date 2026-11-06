'use client'

import { useState } from 'react'
import { FetchLoading } from 'fetch-loading'
import { handleUpdateStatusApi } from '@/api'
import { Message } from '@/app/components/error'
import { useLogout, useToast } from '@/hooks'
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
    const { logout } = useLogout()
    const { showToast } = useToast()

    const [apiError, setApiError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

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
            logout,
            setApiError,
            setIsEditingStatus,
            setInternalStatus,
            setIsLoading,
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
                    <span className="sr-only">Updating status</span>
                    <FetchLoading theme="#f4f4f5" />
                </div>
            ) : isEditingStatus ? (
                <>
                    <label htmlFor="status" className="sr-only">
                        Status
                    </label>
                    <input
                        aria-describedby="statusError"
                        aria-invalid={!!apiError}
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
                    <Message error={apiError} id="statusError" />
                    <div className="flex gap-4 text-normal pt-2">
                        <button
                            onClick={handleCancelStatus}
                            className="settings-menu-button not-disabled:outline-2 outline-red-400 small-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirmStatus}
                            className="settings-menu-button not-disabled:outline-2 outline-blue-400 small-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50 disabled:bg-zinc-600 disabled:text-zinc-300"
                            disabled={isLoading}
                        >
                            Confirm
                        </button>
                    </div>
                </>
            ) : currentStatus ? (
                <p
                    className="text-normal text-center bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl mx-auto"
                    onDoubleClick={handleIsEditingStatus}
                >
                    <span className="sr-only">Status: </span>
                    {currentStatus}
                </p>
            ) : (
                <span className="animate-pulse bg-zinc-800 h-7 sm:h-8 lg:h-9 w-40 px-4 py-1 rounded-xl"></span>
            )}
        </>
    )
}

export default Status
