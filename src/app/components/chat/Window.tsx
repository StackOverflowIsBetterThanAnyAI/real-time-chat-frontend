'use client'

import { FetchLoading } from 'fetch-loading'
import { useContext, useRef } from 'react'
import { Message, SendText } from '@/app/components/chat'
import {
    FallbackProfilePicture,
    ProfilePicture,
} from '@/app/components/settings'
import { ContextChatFriendData } from '@/context'
import {
    useChatScrollToBottom,
    useLogout,
    useToast,
    usePollMessage,
} from '@/hooks'

const Window = () => {
    const contextChatFriendData = useContext(ContextChatFriendData)
    if (!contextChatFriendData) {
        throw new Error(
            'Window must be used within a ContextChatFriendData.Provider'
        )
    }
    const [chatFriendData, setChatFriendData] = contextChatFriendData

    const { logout } = useLogout()
    const { showToast } = useToast()

    const chatRef = useRef<HTMLDivElement>(null)

    useChatScrollToBottom({ chatFriendData, chatRef })

    const conversationId = chatFriendData?.conversationId
    usePollMessage({
        chatFriendData,
        conversationId,
        setChatFriendData,
        logout,
        showToast,
    })

    return (
        <div className="bg-zinc-700 flex flex-col h-full min-h-0 justify-between items-center overflow-hidden">
            {chatFriendData ? (
                <div className="shrink-0 text-sm sm:text-base lg:text-lg flex gap-2 items-center px-4 py-2 bg-zinc-900/60 w-full border-b border-zinc-100">
                    {chatFriendData.friend.profilePicture ? (
                        <span className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-linear-180 from-blue-500 to-blue-700 relative overflow-hidden">
                            <ProfilePicture
                                profilePicture={
                                    chatFriendData.friend.profilePicture
                                }
                                size="small"
                            />
                        </span>
                    ) : (
                        <FallbackProfilePicture
                            id={chatFriendData.id}
                            userName={chatFriendData.friend.userName}
                            size="large"
                        />
                    )}
                    <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                        <div className="text-normal truncate w-full text-left">
                            {chatFriendData.friend.userName}
                        </div>
                        <div className="text-small truncate w-full text-left">
                            {chatFriendData.friend.status}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="shrink-0 flex gap-2 items-center px-4 py-2 bg-zinc-900/60 w-full border-b border-zinc-100">
                    <span className="animate-pulse bg-zinc-700 h-10 lg:h-12 w-10 lg:w-12 px-4 py-1 rounded-full"></span>
                    <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                        <span className="animate-pulse bg-zinc-700 h-5 sm:h-6 lg:h-7 w-full max-w-24 px-4 py-1 rounded-xl"></span>
                        <span className="animate-pulse bg-zinc-700 h-4 sm:h-5 w-full max-w-48 px-4 py-1 rounded-xl"></span>
                    </div>
                </div>
            )}
            {!chatFriendData?.conversationId ||
            chatFriendData.conversationId < 0 ? (
                <FetchLoading theme="#f4f4f5" />
            ) : chatFriendData?.messages.length ? (
                <div
                    className="flex-1 min-h-0 overflow-y-auto w-full flex flex-col gap-2 px-4 py-2"
                    role="log"
                    aria-live="polite"
                    aria-relevant="additions"
                    aria-label="Chat History"
                    ref={chatRef}
                >
                    {chatFriendData.messages.map((item) => (
                        <Message
                            content={item.content}
                            isSent={item.direction === 'sent'}
                            key={item.id}
                        />
                    ))}
                </div>
            ) : (
                <div
                    className="outline outline-blue-600 rounded-r-lg px-2 py-0.5 rounded-t-lg text-normal
                    w-fit max-w-4/5 flex flex-col gap-1 text-pretty text-center"
                >
                    <span>
                        It looks like you haven&#39;t started a chat with this
                        user yet.
                    </span>
                    <span>Send a message now.</span>
                </div>
            )}
            <SendText />
        </div>
    )
}

export default Window
