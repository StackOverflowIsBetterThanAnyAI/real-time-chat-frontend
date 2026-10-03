import { handleUploadProfilePictureApiProps } from '@/types/types'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleUploadProfilePictureApi = async ({
    e,
    setApiError,
    setIsLoading,
    setUserData,
}: handleUploadProfilePictureApiProps) => {
    setIsLoading(true)
    setApiError('')
    try {
        const file = e.target.files?.[0]
        if (!file) {
            return
        }

        const validExtensionRegex = /\.(jpg|jpeg|png|webp)$/i
        if (!validExtensionRegex.test(file.name)) {
            setApiError(
                'Invalid file extension. Only .jpg, .jpeg, .png, and .webp are allowed.'
            )
            return
        }

        if (file.name.length > 192) {
            setApiError('File name is too long.')
            return
        }

        const maxSizeInBytes = 2 * 1024 * 1024
        if (file.size > maxSizeInBytes) {
            setApiError('File is too large. Maximum size is 2MB.')
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
            if (response.status >= 400 && response.status < 500) {
                setApiError(`Could not upload profile pciture. ${error.error}`)
            } else if (response.status >= 500) {
                setApiError(
                    'Could not upload profile picture. Please try again.'
                )
            }
            return
        }

        const data: { profilePicture: string } = await response.json()
        setItemInStorage('profilepicture', data.profilePicture)
        setUserData((prev) =>
            prev ? { ...prev, profilePicture: data.profilePicture } : undefined
        )
        setApiError('')
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch personal user data',
            error
        )
        setApiError('Could not upload profile picture. Please try again.')
    } finally {
        setIsLoading(false)
    }
}
