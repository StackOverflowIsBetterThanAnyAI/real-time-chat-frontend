import { LoginFormHeaderProps } from '@/types/types'

const LoginFormHeader = ({ isSigningUp }: LoginFormHeaderProps) => {
    return (
        <>
            <h2 className="text-center text-large px-1 lg:py-1">
                {isSigningUp ? 'Signup' : 'Login'}
            </h2>
            <h3 className="text-center text-normal px-1 lg:py-1">
                All fields marked with <span className="text-red-800">*</span>{' '}
                are required.
            </h3>
        </>
    )
}

export default LoginFormHeader
