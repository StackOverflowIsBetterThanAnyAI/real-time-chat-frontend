import { handleLogoutApi } from '@/api'
import { FriendType, handleFetchFriendsApiProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const handleFetchFriendsApi = async ({
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleFetchFriendsApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/friends`, {
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
                handleLogoutApi({
                    setFriendsData,
                    setIsLoggedIn,
                    setIsSettingsExpanded,
                    setUserData,
                    showToast,
                })
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
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch your friends',
            error
        )
        showToast({ label: 'Could not update status. Please try again.' })
    } finally {
        setIsLoading(false)
    }
}
