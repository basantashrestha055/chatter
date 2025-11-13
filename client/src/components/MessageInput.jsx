import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';

const MessageInput = () => {
  const { sendMessage } = useChatStore();

  const [text, setText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage({ text: text.trim() });
    setText('');
  };

  return (
    <div className='fixed bottom-0 border-t border-neutral-600 w-full'>
      <form onSubmit={handleSendMessage}>
        <div className='max-w-7xl w-full py-6 px-4 flex items-center justify-center gap-5'>
          <div className='form-control w-2/3'>
            <input
              type='text'
              placeholder='Type your message'
              className='input input-bordered text-sm'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type='submit'
            disabled={!text.trim()}
            className='bg-accent text-white py-3 px-4 rounded-xl disabled:opacity-50'
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;
