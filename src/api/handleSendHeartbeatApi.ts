import { handleSendHeartbeatApiProps } from '@/types'

export const handleSendHeartbeatApi = async ({
    logout,
    showToast,
}: handleSendHeartbeatApiProps) => {
    try {
        const response = await fetch('/api/heartbeat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to send your heartbeat',
                response.status,
                response.statusText
            )
            if (response.status === 401) {
                await logout()
                showToast({
                    label: 'Session expired. Logging user out.',
                })
            }
            return
        }
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
            'An unexpected error occurred while trying to send your heartbeat',
            error
        )
    }
}
