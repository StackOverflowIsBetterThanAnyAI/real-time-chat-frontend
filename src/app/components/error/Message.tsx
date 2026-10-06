import { ErrorMessageProps } from '@/types'

const Message = ({ error, theme = 'red' }: ErrorMessageProps) => {
    return (
        <>
            {error ? (
                <div
                    className={`${theme === 'red' ? 'text-red-800' : 'text-zinc-100'} text-small text-pretty`}
                >
                    {error}
                </div>
            ) : undefined}
        </>
    )
}

export default Message
