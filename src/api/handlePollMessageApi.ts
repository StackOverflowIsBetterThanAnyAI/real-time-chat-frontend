import { SERVER_ADDRESS } from '@/constants'
import { handlePollMessageApiProps, PollingProps } from '@/types'
import { setItemInSessionStorage } from '@/utils'

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
            `${SERVER_ADDRESS}/api/conversation/${conversationId}/poll?after=${lastId}`,
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
            } else if (response.status >= 400) {
                showToast({
                    label: `Could not poll latest message. ${error.error}`,
                })
            }
            return
        }

        const data: PollingProps = await response.json()
        const oldIsPartnerOnline = chatFriendData?.friend.isPartnerOnline

        const hasNewMessages = data.messages && data.messages.length
        const hasOnlineStatusChanged =
            oldIsPartnerOnline !== data.isPartnerOnline

        if (hasNewMessages || hasOnlineStatusChanged) {
            setChatFriendData((prev) => {
                if (!prev) {
                    return prev
                }

                const existingIds = new Set(
                    prev.messages.map((item) => item.id)
                )
                const uniqueNew =
                    data?.messages.filter(
                        (item) => !existingIds.has(item.id)
                    ) || []

                if (
                    !uniqueNew.length &&
                    prev.friend.isPartnerOnline === data.isPartnerOnline
                ) {
                    return prev
                }

                const updatedChatFriendData = {
                    ...prev,
                    messages: uniqueNew.length
                        ? [...prev.messages, ...uniqueNew]
                        : prev.messages,
                    friend: {
                        ...prev.friend,
                        isPartnerOnline: data.isPartnerOnline,
                    },
                }
                setItemInSessionStorage('chatfrienddata', updatedChatFriendData)
                return updatedChatFriendData
            })
        }
    } catch (error) {
        console.error(
            'An unexpected error occurred while trying to poll the latest messages',
            error
        )
        showToast({
            label: 'Could not poll latest message.',
        })
    } finally {
        return performance.now() - startTime
    }
}
