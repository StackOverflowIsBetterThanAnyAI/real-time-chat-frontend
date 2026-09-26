import { LoginFormSwitchProps } from '@/types/types'

const LoginFormSwitch = ({
    isSigningUp,
    handleClick,
}: LoginFormSwitchProps) => {
    const loginStyle = isSigningUp
        ? 'bg-zinc-500/30 hover:bg-zinc-400/40 active:bg-zinc-300'
        : 'bg-blue-800/80 text-zinc-100 hover:bg-blue-800/75 active:bg-blue-800/65'

    const signupStyle = isSigningUp
        ? 'bg-blue-800/80 text-zinc-100 hover:bg-blue-800/75 active:bg-blue-800/65'
        : 'bg-zinc-500/30 hover:bg-zinc-400/40 active:bg-zinc-300'

    const switchStyle = 'w-18 md:w-20 transition duration-500 ease-in-out py-1'

    return (
        <div className="flex justify-center text-normal py-2">
            <button
                aria-pressed={isSigningUp}
                className="flex outline-zinc-100 outline-2 rounded-lg focus-visible:outline-blue-800/80!"
                onClick={handleClick}
                type="button"
            >
                <span
                    className={`${loginStyle} ${switchStyle} rounded-l-lg pl-4 pr-2`}
                >
                    Login
                </span>
                <span
                    className={`${signupStyle} ${switchStyle} rounded-r-lg pl-2 pr-4`}
                >
                    Signup
                </span>
            </button>
        </div>
    )
}

export default LoginFormSwitch
