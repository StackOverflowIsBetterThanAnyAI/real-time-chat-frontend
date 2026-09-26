import { MdOutlineSearch } from 'react-icons/md'
import { RiChatNewFill } from 'react-icons/ri'
import ChatsButton from '@/app/components/chat/ChatsButton'
import userMockData from '@/mock/userMockData.json'

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
            {userMockData[0].chats.map((item, index) => {
                const key = item.chat_history.at(-1) || ''
                const text = Object.values(key)[0]
                return (
                    <ChatsButton
                        friend={item.username}
                        text={text}
                        key={index}
                    />
                )
            })}
        </div>
    )
}

export default Chats
