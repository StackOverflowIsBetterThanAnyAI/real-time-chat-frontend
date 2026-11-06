import { ErrorMessageProps } from '@/types'

const Message = ({ error, id, theme = 'red' }: ErrorMessageProps) => {
    return (
        <div
            id={id}
            aria-live="polite"
            className={`${theme === 'red' ? 'text-red-800' : 'text-zinc-100'} text-small text-pretty`}
        >
            {error || null}
        </div>
    )
}

export default Message
