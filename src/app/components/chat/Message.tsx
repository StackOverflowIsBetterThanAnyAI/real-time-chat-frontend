import { ChatMessageProps } from '@/types'

const Message = ({ content, isSent = false }: ChatMessageProps) => {
    return (
        <div
            className={`${
                isSent
                    ? 'bg-blue-600 self-end rounded-l-lg'
                    : 'outline outline-blue-600 rounded-r-lg'
            } px-2 py-0.5 rounded-t-lg text-normal w-fit max-w-4/5 whitespace-pre-wrap wrap-break-word`}
        >
            {content}
        </div>
    )
}

export default Message
