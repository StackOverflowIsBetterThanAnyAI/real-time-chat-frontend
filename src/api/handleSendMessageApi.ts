import { handleLogoutApi } from '@/api'
import { handleSendMessageApiProps } from '@/types'

let tempIdCounter = -1

export const handleSendMessageApi = async ({
    id,
    message,
    setChatFriendData,
    setFriendsData,
    setIsLoggedIn,
    setIsSettingsExpanded,
    setUserData,
    showToast,
    userData,
}: handleSendMessageApiProps) => {
    const tempId = tempIdCounter--
    const messageObject = {
        id: tempId,
        content: message,
        createdAt: new Date().toISOString(),
        sender: {
            userName: userData?.userName || '',
        },
    }
    setChatFriendData((prev) =>
        prev
            ? {
                  ...prev,
                  messages: [...prev.messages, messageObject],
                  draftedMessage: '',
              }
            : prev
    )
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
            setChatFriendData((prev) =>
                prev
                    ? {
                          ...prev,
                          messages: prev.messages.filter(
                              (msg) => msg.id !== tempId
                          ),
                      }
                    : prev
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

        const savedMessage = await response.json()
        setChatFriendData((prev) => {
            if (!prev) {
                return prev
            }

            const index = prev.messages.findIndex((item) => item.id === tempId)
            if (index === -1) {
                return {
                    ...prev,
                    messages: [...prev.messages, savedMessage],
                }
            }

            const updatedMessages = [...prev.messages]
            updatedMessages[index] = savedMessage

            return {
                ...prev,
                messages: updatedMessages,
            }
        })
    } catch (error) {
        setChatFriendData((prev) =>
            prev
                ? {
                      ...prev,
                      messages: prev.messages.filter(
                          (item) => item.id !== tempId
                      ),
                  }
                : prev
        )

        console.error(
            'An unexpected error occurred while trying to send the message',
            error
        )
        showToast({
            label: 'Could not send message. Please try again.',
        })
    }
}
