import { ConversationProps, handlePollMessageApiProps } from '@/types'

export const handlePollMessageApi = async ({
    chatFriendData,
    conversationId,
    logout,
    setChatFriendData,
    showToast,
}: handlePollMessageApiProps) => {
    const startTime = performance.now()

    const currentMessages = chatFriendData?.messages
    const lastId = currentMessages?.length
        ? Math.max(...currentMessages.map((item) => item.id))
        : 0

    try {
        const response = await fetch(
            `http://localhost:8000/api/conversation/${conversationId}/poll?after=${lastId}`,
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
                'An unexpected error occurred while trying to poll the latest messages',
                response.status,
                response.statusText
            )
            const error = await response.json()
            if (response.status === 401) {
                await logout()
                showToast({
                    label: 'Session expired. Logging user out.',
                })
            } else if (response.status >= 400 && response.status < 500) {
                showToast({
                    label: `Could not poll latest message. ${error.error}`,
                })
            } else if (response.status >= 500) {
                showToast({
                    label: 'Could not poll latest message. Please try again.',
                })
            }
            return
        }

        const data: ConversationProps['messages'] = await response.json()

        if (data.length) {
            setChatFriendData((prev) => {
                if (!prev) {
                    return prev
                }

                const existingIds = new Set(
                    prev.messages.map((item) => item.id)
                )
                const uniqueNew = data.filter(
                    (item) => !existingIds.has(item.id)
                )
                if (!uniqueNew.length) {
                    return prev
                }

                return {
                    ...prev,
                    messages: [...prev.messages, ...uniqueNew],
                }
            })
        }
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to poll the latest messages',
            error
        )
        showToast({
            label: 'Could not poll latest message. Please try again.',
        })
    } finally {
        return performance.now() - startTime
    }
}
