import { ErrorFieldProps } from '@/types/types'

const ErrorField = ({ error }: ErrorFieldProps) => {
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

export default ErrorField
