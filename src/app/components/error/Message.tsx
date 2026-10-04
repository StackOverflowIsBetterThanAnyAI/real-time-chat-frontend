import { ErrorMessageProps } from '@/types'

const Message = ({ error }: ErrorMessageProps) => {
    return (
        <>
            {error ? (
                <div className="text-red-800 text-small text-pretty">
                    {error}
                </div>
            ) : undefined}
        </>
    )
}

export default Message
