import { SettingsHeaderProps } from '@/types'

const Header = ({ header, id }: SettingsHeaderProps) => {
    return (
        <>
            <h2 className="text-large" id={id}>
                {header}
            </h2>
            <hr className="my-1 border-zinc-100" />
        </>
    )
}

export default Header
