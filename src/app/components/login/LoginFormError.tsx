import { LoginFormErrorProps } from '@/types/types'

const LoginFormError = ({ error }: LoginFormErrorProps) => {
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

export default LoginFormError
