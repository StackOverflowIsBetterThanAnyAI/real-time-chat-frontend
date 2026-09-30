import { handleLoginApiProps } from '@/types/types'
import { setItemInStorage } from '@/utils/setItemInStorage'

export const handleRegisterApi = async ({
    password,
    setIsLoading,
    setIsLoggedIn,
    userName,
}: handleLoginApiProps) => {
    setIsLoading(true)
    try {
        const response = await fetch(`http://localhost:8000/api/register`, {
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
            console.log('error')
            throw new Error('error')
        }

        setIsLoggedIn(true)
        setItemInStorage('isloggedin', true)
    } catch (error) {
        console.error(error)
    } finally {
        setIsLoading(false)
    }
}
