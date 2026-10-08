import { handleRemoveProfilePictureApiProps } from '@/types'
import { handleLogout, setItemInStorage } from '@/utils'

export const handleRemoveProfilePictureApi = async ({
    setFriendsData,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleRemoveProfilePictureApiProps) => {
    setIsLoading(true)
    try {
        const formData = new FormData()
        formData.append('remove', 'true')

        const response = await fetch(
            `http://localhost:8000/api/profile-picture`,
            {
                method: 'POST',
                body: formData,
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to remove the profile picture',
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
                showToast({
                    label: `Could not remove profile pciture. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not remove profile picture. Please try again.',
                })
            }
            return
        }

        setItemInStorage('profilepicture', null)
        setUserData((prev) =>
            prev ? { ...prev, profilePicture: null } : undefined
        )
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to remove profile picture',
            error
        )
        showToast({
            label: 'Could not remove profile picture. Please try again.',
        })
    } finally {
        setIsLoading(false)
    }
}
