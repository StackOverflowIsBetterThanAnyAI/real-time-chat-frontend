import { SettingsOnlineIndicatorProps } from '@/types'

const OnlineIndicator = ({ isOnline }: SettingsOnlineIndicatorProps) => {
    const label = isOnline ? 'online' : 'offline'

    return (
        <span
            className={`${isOnline ? 'bg-green-500 outline-1 outline-zinc-200' : 'bg-zinc-800 outline-2 outline-zinc-300'}
            rounded-full w-3 h-3 absolute bottom-0 right-0`}
            role="img"
            aria-label={label}
            title={label}
        ></span>
    )
}

export default OnlineIndicator
