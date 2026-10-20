import { handleSendMessageApiProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

let tempIdCounter = -1

export const handleSendMessageApi = async ({
    id,
    logout,
    message,
    setChatFriendData,
    showToast,
}: handleSendMessageApiProps) => {
    const API_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000'

    const tempId = tempIdCounter--
    const messageObject = {
        id: tempId,
        content: message,
        createdAt: new Date().toISOString(),
        direction: 'sent' as const,
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
            `${API_URL}/api/conversation/${id}/message`,
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
                await logout()
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
                const updatedChatFriendData = {
                    ...prev,
                    messages: [...prev.messages, savedMessage],
                }
                setItemInSessionStorage('chatfrienddata', updatedChatFriendData)
                return updatedChatFriendData
            }

            const updatedMessages = [...prev.messages]
            updatedMessages[index] = savedMessage
            const updatedChatFriendData = {
                ...prev,
                messages: updatedMessages,
            }
            setItemInSessionStorage('chatfrienddata', updatedChatFriendData)
            return updatedChatFriendData
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
