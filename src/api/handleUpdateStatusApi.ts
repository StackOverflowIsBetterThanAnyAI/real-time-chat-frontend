import { handleUpdateStatusApiProps } from '@/types'
import { setItemInSessionStorage, setItemInStorage } from '@/utils'

export const handleUpdateStatusApi = async ({
    currentStatus,
    internalStatus,
    logout,
    setApiError,
    setIsEditingStatus,
    setInternalStatus,
    setIsLoading,
    setUserData,
    showToast,
}: handleUpdateStatusApiProps) => {
    const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

    setIsLoading(true)
    setApiError('')
    try {
        const response = await fetch(`${API_URL}/api/status`, {
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
                await logout()
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
        setItemInSessionStorage('iseditingstatus', false)
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
