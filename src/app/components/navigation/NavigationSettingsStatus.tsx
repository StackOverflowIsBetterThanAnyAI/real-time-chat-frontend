import { useState } from 'react'
import { FetchLoading } from 'fetch-loading'
import { handleUpdateStatusApi } from '@/api/handleUpdateStatusApi'
import { useEscapeFocusTrapEditingStatus } from '@/hooks/useEscapeFocusTrapEditingStatus'
import { NavigationSettingsStatusProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

const NavigationSettingsStatus = ({
    isEditingStatus,
    setIsEditingStatus,
    setStatus,
    setUserData,
    status,
    userData,
    userMockData,
}: NavigationSettingsStatusProps) => {
    const [isLoadingStatus, setIsLoadingStatus] = useState<boolean>(false)

    const fallbackValue = userData?.status || userMockData.status

    useEscapeFocusTrapEditingStatus({ setIsEditingStatus })

    const handleCancelStatus = () => {
        setIsEditingStatus(false)
        setStatus(fallbackValue)
        setItemInSessionStorage('status', fallbackValue)
    }
    const handleChangeStatus = (e: React.InputEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setStatus(newValue)
        setItemInSessionStorage('status', newValue)
    }
    const handleConfirmStatus = () => {
        setIsEditingStatus(false)
        if (
            status.length &&
            status.length <= 255 &&
            status !== userData?.status
        ) {
            handleUpdateStatus()
        } else {
            setStatus(fallbackValue)
            setItemInSessionStorage('status', fallbackValue)
        }
    }
    const handleKeyDownStatus = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleConfirmStatus()
        }
    }
    const handleUpdateStatus = () => {
        handleUpdateStatusApi({
            fallbackValue,
            setIsLoadingStatus,
            setStatus,
            setUserData,
            status,
            userData,
        })
    }

    return isEditingStatus ? (
        <>
            <input
                className="text-normal bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl mx-auto"
                value={status || userData?.status || userMockData.status}
                onInput={handleChangeStatus}
                onKeyDown={handleKeyDownStatus}
                id="status"
                maxLength={255}
                minLength={1}
            />
            <label htmlFor="status" className="sr-only">
                Status
            </label>
            <div className="flex gap-4 text-normal pt-2">
                <button
                    onClick={handleCancelStatus}
                    className="settings-menu-button outline-2 outline-red-800 regular-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50"
                    disabled={isLoadingStatus}
                >
                    Cancel
                </button>
                <button
                    onClick={handleConfirmStatus}
                    className="settings-menu-button outline-2 outline-blue-600 regular-button w-24 flex justify-center
                            hover:bg-zinc-800/50 active:bg-zinc-800/50"
                    disabled={isLoadingStatus}
                >
                    Confirm
                </button>
            </div>
        </>
    ) : isLoadingStatus ? (
        <FetchLoading />
    ) : (
        <h3 className="text-normal text-center bg-zinc-800 max-w-full w-fit px-4 py-1 rounded-xl mx-auto">
            {userData?.status || userMockData.status}
        </h3>
    )
}

export default NavigationSettingsStatus
