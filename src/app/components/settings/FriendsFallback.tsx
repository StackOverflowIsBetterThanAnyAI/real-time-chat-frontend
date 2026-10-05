import { SettingsFriendsFallbackProps } from '@/types'

const FriendsFallback = ({ fallback }: SettingsFriendsFallbackProps) => {
    return <div className="px-4 py-2 text-small">{fallback}</div>
}

export default FriendsFallback
