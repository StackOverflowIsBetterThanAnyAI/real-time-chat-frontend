import Chats from '@/app/components/chat/Chats'
import ChatWindow from '@/app/components/chat/ChatWindow'

const Chat = () => {
    return (
        <main className="grid grid-cols-[1fr_1fr] md:grid-cols-[minmax(0,448px)_1fr] w-full h-full">
            <Chats />
            <ChatWindow />
        </main>
    )
}

export default Chat
