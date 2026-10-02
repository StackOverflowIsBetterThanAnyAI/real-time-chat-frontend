import { handleUpdateStatusAPiProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const handleUpdateStatusApi = async ({
    currentStatus,
    internalStatus,
    setApiError,
    setIsEditingStatus,
    setInternalStatus,
    setIsLoadingStatus,
    setUserData,
    userData,
}: handleUpdateStatusAPiProps) => {
    setIsLoadingStatus(true)
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
            setItemInSessionStorage('status', currentStatus)
            console.log(
                'An unexpected error occurred while trying to update the status',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status >= 400 && response.status < 500) {
                setApiError(`Could not update status. ${error.error}`)
            } else if (response.status >= 500) {
                setApiError('Could not update status. Please try again.')
            }
            return
        }

        setUserData({ ...userData!, status: internalStatus })
        setItemInSessionStorage('status', internalStatus)
        setInternalStatus(internalStatus)
        setIsEditingStatus(false)
        setApiError('')
    } catch (error) {
        setInternalStatus(currentStatus)
        setItemInSessionStorage('status', currentStatus)
        console.error(
            'An unexpected error occurred while trying to update the status',
            error
        )
        setApiError('Could not update status. Please try again.')
    } finally {
        setIsLoadingStatus(false)
    }
}
