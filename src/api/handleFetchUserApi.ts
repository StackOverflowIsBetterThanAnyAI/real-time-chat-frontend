import { handleFetchUserApiProps, UserDataProps } from '@/types/types'
import { setItemInStorage } from '@/utils'

export const handleFetchUserApi = async ({
    setIsLoading,
    setUserData,
}: handleFetchUserApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to fetch personal user data',
                response.status,
                response.statusText
            )
            return
        }

        const data: UserDataProps = await response.json()
        setUserData({
            profilePicture: data.profilePicture,
            status: data.status,
            userName: data.userName,
        })
        setItemInStorage('profilepicture', data.profilePicture)
        setItemInStorage('status', data.status)
        setItemInStorage('username', data.userName)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to fetch personal user data',
            error
        )
    } finally {
        setIsLoading(false)
    }
}
