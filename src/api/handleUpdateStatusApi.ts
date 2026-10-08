import { handleUpdateStatusAPiProps } from '@/types'
import { handleLogout, setItemInStorage } from '@/utils'

export const handleUpdateStatusApi = async ({
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
}: handleUpdateStatusAPiProps) => {
    setIsLoading(true)
    setApiError('')
    try {
        const response = await fetch(`http://localhost:8000/api/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: internalStatus }),
            credentials: 'include',
        })

        if (!response.ok) {
            setInternalStatus(currentStatus)
            setItemInStorage('status', currentStatus)
            console.log(
                'An unexpected error occurred while trying to update the status',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                setApiError(`Could not update status. ${error.error}`)
            } else if (response.status >= 500) {
                setApiError('Could not update status. Please try again.')
            }
            return
        }

        setUserData((prev) =>
            prev ? { ...prev, status: internalStatus } : undefined
        )
        setItemInStorage('status', internalStatus)
        setInternalStatus(internalStatus)
        setIsEditingStatus(false)
        setApiError('')
    } catch (error) {
        setInternalStatus(currentStatus)
        setItemInStorage('status', currentStatus)
        console.error(
            'An unexpected error occurred while trying to update the status',
            error
        )
        setApiError('Could not update status. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
