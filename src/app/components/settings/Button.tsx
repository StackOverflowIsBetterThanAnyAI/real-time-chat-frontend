import { SettingsButtonProps } from '@/types'
import { FetchLoading } from 'fetch-loading'

const Button = ({
    handleClick,
    icon,
    isClicked = false,
    isClickedLabel = '',
    isDelete = false,
    isLoading = false,
    label,
}: SettingsButtonProps) => {
    return isLoading ? (
        <div
            className={`settings-menu-button regular-button h-9 sm:h-10 lg:h-11 flex justify-center
            ${isDelete ? ' outline-2 outline-red-500' : ''} cursor-not-allowed`}
        >
            <FetchLoading theme="#f4f4f5" />
        </div>
    ) : isClicked ? (
        <div className="regular-button">
            {icon}
            <span>{isClickedLabel}</span>
        </div>
    ) : (
        <button
            className={`settings-menu-button regular-button hover:bg-zinc-800/50
            ${isDelete ? ' outline-2 outline-red-500' : ''} active:bg-zinc-800/50`}
            onClick={handleClick}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

export default Button
