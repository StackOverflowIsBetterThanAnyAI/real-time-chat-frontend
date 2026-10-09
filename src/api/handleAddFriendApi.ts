import { handleLogoutApi } from '@/api'
import { FriendType, handleAddFriendApiProps } from '@/types'

export const handleAddFriendApi = async ({
    setError,
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    setUserToBeAdded,
    showToast,
    userToBeAdded,
}: handleAddFriendApiProps) => {
    setError('')
    setIsLoading(true)
    try {
        const response = await fetch(
            `http://localhost:8000/api/friends/request`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userName: userToBeAdded }),
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to add the user as friend',
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
                setError(`Could not send friend request. ${error.error}`)
            } else if (response.status >= 500) {
                setError('Could not send friend request. Please try again.')
            }
            return
        }

        const data: FriendType = await response.json()
        showToast({
            label: 'Friend request sent successfully!',
        })
        setFriendsData((prev) => (prev ? [...prev, data] : [data]))
        setUserToBeAdded('')
        setError('')
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to add the user as friend',
            error
        )
        setError('Could not send friend request. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
