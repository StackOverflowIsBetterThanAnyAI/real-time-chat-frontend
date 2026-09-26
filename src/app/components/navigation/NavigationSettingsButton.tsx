import { NavigationSettingsButtonProps } from '@/types/types'

const NavigationSettingsButton = ({
    icon,
    handleClick,
    isDelete = false,
    label,
}: NavigationSettingsButtonProps) => {
    return (
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

export default NavigationSettingsButton
