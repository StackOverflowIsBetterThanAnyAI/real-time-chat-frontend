import { FriendType, handleFetchFriendsApiProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const handleFetchFriendsApi = async ({
    logout,
    setFriendsData,
    setIsLoading,
    showToast,
}: handleFetchFriendsApiProps) => {
    const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

    setIsLoading(true)
    try {
        const response = await fetch(`${API_URL}/api/friends`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch your friends',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                await logout()
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({ label: `Could not fetch friends. ${error.error}` })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not fetch friends. Please try again.',
                })
            }
            return
        }

        const data: FriendType[] = await response.json()
        setFriendsData(data)
        setItemInSessionStorage('friendsdata', data)
    } catch (error: unknown) {
        if (
            (typeof error === 'object' &&
                error !== null &&
                'name' in error &&
                error.name === 'AbortError') ||
            (error instanceof TypeError &&
                error.message.includes('NetworkError'))
        ) {
            return
        }
        console.error(
            'An unexpected error occurred while trying to fetch your friends',
            error
        )
        showToast({ label: 'Could not update status. Please try again.' })
    } finally {
        setIsLoading(false)
    }
}
