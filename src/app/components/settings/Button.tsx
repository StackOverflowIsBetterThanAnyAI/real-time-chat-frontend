import { SettingsButtonProps } from '@/types'

const Button = ({
    icon,
    isClicked = false,
    isClickedLabel = '',
    handleClick,
    isDelete = false,
    label,
}: SettingsButtonProps) => {
    return isClicked ? (
        <div className="regular-button">
            {icon}
            <span>{isClickedLabel}</span>
        </div>
    ) : (
        <button
            className={`settings-menu-button regular-button hover:bg-zinc-800/50
            ${isDelete ? ' outline-2 outline-red-800' : ''} active:bg-zinc-800/50`}
            onClick={handleClick}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

export default Button
