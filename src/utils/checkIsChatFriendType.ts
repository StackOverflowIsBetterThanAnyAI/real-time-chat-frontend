import { ChatFriendType } from '@/types'
import { checkIsFriendType } from '@/utils'

export const checkIsChatFriendType = (
    item: unknown
): item is ChatFriendType => {
    if (!checkIsFriendType(item)) {
        return false
    }

    if (
        !('conversationId' in item) ||
        !('messages' in item) ||
        !('draftedMessage' in item)
    ) {
        return false
    }

    if (
        typeof item.conversationId !== 'number' ||
        typeof item.draftedMessage !== 'string' ||
        !Array.isArray(item.messages)
    ) {
        return false
    }

    const isMessageValid = (msg: unknown) => {
        if (typeof msg !== 'object' || msg === null) {
            return false
        }

        if (
            !('id' in msg) ||
            !('content' in msg) ||
            !('createdAt' in msg) ||
            !('direction' in msg)
        ) {
            return false
        }

        const direction = (msg as { direction?: unknown }).direction

        return (
            typeof (msg as { id?: unknown }).id === 'number' &&
            typeof (msg as { content?: unknown }).content === 'string' &&
            typeof (msg as { createdAt?: unknown }).createdAt === 'string' &&
            typeof direction === 'string' &&
            ['received', 'sent'].includes(direction)
        )
    }

    return item.messages.every(isMessageValid)
}
