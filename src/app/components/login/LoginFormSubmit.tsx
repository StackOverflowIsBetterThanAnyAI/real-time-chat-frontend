import { FetchLoading } from 'fetch-loading'
import { LoginFormSubmitProps } from '@/types/types'

const LoginFormSubmit = ({
    handleClick,
    isDisabled,
    isLoading,
    value,
}: LoginFormSubmitProps) => {
    return isLoading ? (
        <button
            className="flex items-center justify-center w-32 sm:w-40 sm:h-9 self-center text-large
            bg-zinc-200 outline outline-zinc-500 text-zinc-600 px-2 py-1 mb-1 sm:mb-4 mt-4 rounded-xl"
            aria-label={`${value} disabled.`}
            disabled={true}
            title={`${value} disabled.`}
        >
            <FetchLoading theme="#44403c" />
        </button>
    ) : (
        <input
            type="button"
            className="w-32 sm:w-40 self-center text-large bg-zinc-100 disabled:bg-zinc-200
            outline disabled:outline-0 outline-zinc-500 disabled:text-zinc-600 px-2 py-1 mb-1
            sm:mb-4 mt-4 rounded-xl enabled:hover:bg-zinc-300 enabled:active:bg-zinc-400"
            aria-label={`${value}${isDisabled ? ' disabled.' : ''}`}
            onClick={handleClick}
            disabled={isDisabled}
            title={`${value}${isDisabled ? ' disabled.' : ''}`}
            value={value}
        />
    )
}

export default LoginFormSubmit
