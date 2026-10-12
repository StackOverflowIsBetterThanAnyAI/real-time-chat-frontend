import { useChatScrollToBottomProps } from '@/types'
import { useEffect } from 'react'

export const useChatScrollToBottom = ({
    chatFriendData,
    chatRef,
}: useChatScrollToBottomProps) => {
    useEffect(() => {
        if (chatRef?.current) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                left: 0,
                behavior: 'smooth',
            })
        }
    }, [chatFriendData?.messages])
}
