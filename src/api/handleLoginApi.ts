import { handleLoginApiProps } from '@/types/types'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleLoginApi = async ({
    password,
    setIsLoading,
    setIsLoggedIn,
    userName,
}: handleLoginApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userName, password }),
            credentials: 'include',
        })

        if (!response.ok) {
            setIsLoggedIn(false)
            setItemInStorage('isloggedin', false)
            console.log(
                'An unexpected error occurred while trying to login',
                response.status,
                response.statusText
            )
            return
        }

        setIsLoggedIn(true)
        setItemInStorage('isloggedin', true)
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to login',
            error
        )
    } finally {
        setIsLoading(false)
    }
}
