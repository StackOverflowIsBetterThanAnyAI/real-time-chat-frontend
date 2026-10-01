import { handleUpdateStatusAPiProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const handleUpdateStatusApi = async ({
    currentStatus,
    internalStatus,
    setIsEditingStatus,
    setInternalStatus,
    setIsLoadingStatus,
    setUserData,
    userData,
}: handleUpdateStatusAPiProps) => {
    try {
        setIsLoadingStatus(true)
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
            return
        }

        setUserData({ ...userData!, status: internalStatus })
        setItemInSessionStorage('status', internalStatus)
        setInternalStatus(internalStatus)
        setIsEditingStatus(false)
    } catch (error) {
        setInternalStatus(currentStatus)
        setItemInSessionStorage('status', currentStatus)
        console.error(
            'An unexpected error occurred while trying to update the status',
            error
        )
    } finally {
        setIsLoadingStatus(false)
    }
}
