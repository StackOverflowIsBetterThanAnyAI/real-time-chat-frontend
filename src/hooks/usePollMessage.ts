import { useEffect } from 'react'
import { handlePollMessageApi } from '@/api'
import { usePollMessageProps } from '@/types'

export const usePollMessage = ({
    chatFriendData,
    conversationId,
    logout,
    setChatFriendData,
    showToast,
}: usePollMessageProps) => {
    useEffect(() => {
        if (!conversationId || conversationId < 0) {
            return
        }

        let isMounted = true
        let timeoutId: NodeJS.Timeout

        const pollMessages = async () => {
            const rtt =
                (await handlePollMessageApi({
                    chatFriendData,
                    conversationId,
                    logout,
                    setChatFriendData,
                    showToast,
                })) || 0

            const interval = rtt < 1000 ? 2000 : rtt < 2000 ? 4000 : 8000

            if (isMounted) {
                timeoutId = setTimeout(pollMessages, interval)
            }
        }

        timeoutId = setTimeout(pollMessages, 1500)
        return () => {
            isMounted = false
            clearTimeout(timeoutId)
        }
    }, [
        chatFriendData,
        conversationId,
        chatFriendData?.messages,
        logout,
        setChatFriendData,
        showToast,
    ])
}
