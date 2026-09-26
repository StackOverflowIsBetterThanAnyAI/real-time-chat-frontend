import { MdOutlineSearch } from 'react-icons/md'
import { RiChatNewFill } from 'react-icons/ri'

const Chats = () => {
    return (
        <div className="flex flex-col gap-4 bg-zinc-800/80 p-2">
            <button
                className="regular-button bg-blue-600 hover:bg-blue-600/85 active:bg-blue-600/75"
                onClick={() => {}}
            >
                <RiChatNewFill />
                <span>New Chat</span>
            </button>
            <div className="flex flex-wrap gap-2 items-center">
                <label htmlFor="search" aria-label="Search">
                    <MdOutlineSearch className="w-8 h-8" />
                </label>
                <input
                    className="bg-zinc-100 outline outline-zinc-500 text-zinc-950 text-normal rounded px-2 py-1
                    hover:bg-zinc-200 flex-1 min-w-32"
                    id="search"
                    type="search"
                    placeholder="JohnDoe1337"
                />
            </div>
            <button
                className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
                onClick={() => {}}
            >
                <RiChatNewFill />
                <span>New Chat</span>
            </button>
            <button
                className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
                onClick={() => {}}
            >
                <RiChatNewFill />
                <span>New Chat</span>
            </button>
            <button
                className="regular-button hover:bg-zinc-900/60 active:bg-zinc-900/60"
                onClick={() => {}}
            >
                <RiChatNewFill />
                <span>New Chat</span>
            </button>
        </div>
    )
}

export default Chats
