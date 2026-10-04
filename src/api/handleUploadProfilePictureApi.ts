import { handleUploadProfilePictureApiProps } from '@/types'
import { handleLogout, setItemInStorage } from '@/utils'

export const handleUploadProfilePictureApi = async ({
    e,
    setIsLoading,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
}: handleUploadProfilePictureApiProps) => {
    setIsLoading(true)
    try {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }

        const validExtensionRegex = /\.(jpg|jpeg|png|webp)$/i
        if (!validExtensionRegex.test(file.name)) {
            showToast({
                label: 'Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.',
            })
            return
        }

        if (file.name.length > 192) {
            showToast({
                label: 'File name is too long.',
            })
            return
        }

        const maxSizeInBytes = 2 * 1024 * 1024
        if (file.size > maxSizeInBytes) {
            showToast({
                label: 'File is too large. Maximum size is 2MB.',
            })
            return
        }

        const formData = new FormData()
        formData.append('profilePicture', file)

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
                'An unexpected error occurred while trying to upload the profile picture',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                handleLogout({ setIsLoggedIn, setIsSettingsExpanded })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not upload profile pciture. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not upload profile picture. Please try again.',
                })
            }
            return
        }

        const data: { profilePicture: string } = await response.json()
        setItemInStorage('profilepicture', data.profilePicture)
        setUserData((prev) =>
            prev ? { ...prev, profilePicture: data.profilePicture } : undefined
        )
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch personal user data',
            error
        )
        showToast({
            label: 'Could not upload profile picture. Please try again.',
        })
    } finally {
        setIsLoading(false)
    }
}
