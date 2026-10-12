import { handleLogoutApi } from '@/api'
import { handleSendMessageApiProps } from '@/types'

export const handleSendMessageApi = async ({
    id,
    message,
    setChatFriendData,
    setFriendsData,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setMessage,
    setUserData,
    showToast,
    userData,
}: handleSendMessageApiProps) => {
    setChatFriendData((prev) =>
        prev
            ? {
                  ...prev,
                  messages: [
                      ...prev.messages,
                      {
                          id: -Date.now(),
                          content: message,
                          createdAt: new Date().toISOString(),
                          sender: {
                              userName: userData?.userName || '',
                          },
                      },
                  ],
              }
            : prev
    )
    setMessage('')
    try {
        const response = await fetch(
            `http://localhost:8000/api/conversation/${id}/message`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: message }),
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to send the message',
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
                showToast({
                    label: `Could not send message. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not send message. Please try again.',
                })
            }
            return
        }
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to send the message',
            error
        )
        showToast({
            label: 'Could not send message. Please try again.',
        })
    }
}
