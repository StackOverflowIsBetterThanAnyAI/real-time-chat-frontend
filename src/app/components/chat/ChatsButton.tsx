import { ChatsButtonProps } from '@/types/types'

const ChatsButton = ({ friend, text }: ChatsButtonProps) => {
    return (
        <button
            className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
            onClick={() => {}}
        >
            <span className="w-12 h-12 rounded-full bg-blue-600"></span>
            <div className="flex flex-col gap-1 mb-auto items-start min-w-0 flex-1">
                <div className="text-normal truncate w-full text-left">
                    {friend}
                </div>
                <div className="text-small truncate w-full text-left">
                    {text}
                </div>
            </div>
        </button>
    )
}

export default ChatsButton
