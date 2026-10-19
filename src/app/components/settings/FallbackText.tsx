import { SettingsFallbackTextProps } from '@/types'

const FallbackText = ({ fallback }: SettingsFallbackTextProps) => {
    return <div className="px-4 py-3 sm:py-2.5 text-small">{fallback}</div>
}

export default FallbackText
