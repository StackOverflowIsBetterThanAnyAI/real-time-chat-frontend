import { NavigationSettingsButtonProps } from '@/types/types'

const NavigationSettingsButton = ({
    icon,
    handleClick,
    isDelete = false,
    label,
}: NavigationSettingsButtonProps) => {
    return (
        <button
            className={`settings-menu-button text-normal flex gap-2 items-center px-4 py-2 hover:bg-zinc-800/50 rounded-xl
            ${isDelete ? ' outline-2 outline-red-800' : ''} active:bg-zinc-800/50`}
            onClick={handleClick}
        >
            {icon}
            <span>{label}</span>
        </button>
    )
}

export default NavigationSettingsButton
