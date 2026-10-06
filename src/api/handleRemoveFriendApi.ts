import { handleRemoveFriendApiProps } from '@/types'
import { handleLogout } from '@/utils'

export const handleRemoveFriendApi = async ({
    id,
    setFriendsData,
    setIsLoadingRemove,
    setIsLoggedIn,
    setIsSettingsExpanded,
    showToast,
}: handleRemoveFriendApiProps) => {
    setIsLoadingRemove(true)
    try {
        const response = await fetch(
            `http://localhost:8000/api/friends/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to remove the friend',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({ setIsLoggedIn, setIsSettingsExpanded })
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not remove friend. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not remove friend. Please try again.',
                })
            }
            return
        }

        setFriendsData((prev) => prev?.filter((item) => item.id !== id))
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to remove the friend',
            error
        )
        showToast({
            label: 'Could not remove friend. Please try again.',
        })
    } finally {
        setIsLoadingRemove(false)
    }
}
