import { SettingsHeaderProps } from '@/types'

const Header = ({ header }: SettingsHeaderProps) => {
    return (
        <>
            <h2 className="text-large">{header}</h2>
            <hr className="my-1 border-zinc-100" />
        </>
    )
}

export default Header
