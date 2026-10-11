'use client'

import { useState } from 'react'
import { IoMdSend } from 'react-icons/io'

const SendText = () => {
    const [message, setMessage] = useState<string>('')
    return (
        <div className="flex w-full gap-1 justify-between bg-zinc-800 p-1">
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message ..."
                rows={3}
                className="resize-none w-full bg-zinc-700 px-4 py-2 text-base"
            />
            <button className="regular-button bg-blue-600 hover:bg-blue-600/85 active:bg-blue-600/75 h-fit self-end">
                <IoMdSend color="#f4f4f5" />
            </button>
        </div>
    )
}

export default SendText
