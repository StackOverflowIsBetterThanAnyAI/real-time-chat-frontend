import { handleUpdateStatusAPiProps } from '@/types/types'
import { setItemInSessionStorage } from '@/utils/setItemInSessionStorage'

export const handleUpdateStatusApi = async ({
    fallbackValue,
    setIsLoadingStatus,
    setStatus,
    setUserData,
    status,
    userData,
}: handleUpdateStatusAPiProps) => {
    try {
        setIsLoadingStatus(true)
        const response = await fetch(`http://localhost:8000/api/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
            credentials: 'include',
        })

        if (!response.ok) {
            setStatus(fallbackValue)
            setItemInSessionStorage('status', fallbackValue)
            console.log(
                'An unexpected error occurred while trying to update the status',
                response.status,
                response.statusText
            )
            return
        }

        setUserData({ ...userData!, status })
        setItemInSessionStorage('status', status)
    } catch (error) {
        setStatus(fallbackValue)
        setItemInSessionStorage('status', fallbackValue)
        console.error(
            'An unexpected error occurred while trying to update the status',
            error
        )
    } finally {
        setIsLoadingStatus(false)
    }
}
