import { ConversationProps, handleOpenChatApiProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

export const handleOpenChatApi = async ({
    friend,
    logout,
    setChatFriendData,
    showToast,
}: handleOpenChatApiProps) => {
    try {
        const response = await fetch(
            `http://localhost:8000/api/conversation/${friend}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        )

        if (!response.ok) {
            console.log(
                'An unexpected error occurred while trying to open the chat',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                await logout()
                showToast({ label: 'Session expired. Logging user out.' })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not open chat. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not open chat. Please try again.',
                })
            }
            return
        }

        const data: ConversationProps = await response.json()
        setChatFriendData((prev) => {
            const updatedChatFriendData = prev
                ? {
                      ...prev,
                      conversationId: data.conversationId,
                      messages: data.messages,
                  }
                : prev
            setItemInSessionStorage('chatfrienddata', updatedChatFriendData)
            return updatedChatFriendData
        })
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to open the chat',
            error
        )
        showToast({ label: 'Could not open chat.' })
    }
}
