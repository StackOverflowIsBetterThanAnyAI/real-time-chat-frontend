import { FetchLoading } from 'fetch-loading'
import { ChatEmptyWindowProps } from '@/types'

const EmptyWindow = ({ isLoading }: ChatEmptyWindowProps) => {
    return (
        <div className="bg-zinc-700 flex flex-col gap-2 justify-center items-center min-h-full">
            {isLoading ? <FetchLoading theme="#f4f4f5" /> : null}
        </div>
    )
}

export default EmptyWindow
