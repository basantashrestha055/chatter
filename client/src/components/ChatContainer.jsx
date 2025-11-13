import React, { use, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const {
    messages,
    fetchMessagesByUserId,
    selectedUser,
    isMessagesLoading,
    listenToMessages,
    unListenToMessages,
  } = useChatStore();

  useEffect(() => {
    fetchMessagesByUserId(selectedUser._id);
    listenToMessages();

    return () => unListenToMessages();
  }, [
    fetchMessagesByUserId,
    selectedUser,
    listenToMessages,
    unListenToMessages,
  ]);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />

      <div className='py-2'>
        {!isMessagesLoading && messages.length > 0 ? (
          <div className='px-6 py-8 max-h-[575px] overflow-y-auto'>
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? 'chat-end' : 'chat-start'
                }`}
              >
                <div
                  className={`chat-bubble ${
                    msg.senderId === authUser._id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {msg.text && <p className='mt-2'>{msg.text}</p>}
                  <p className='text-xs py-1 opacity-80'>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        ) : isMessagesLoading ? (
          <div>messages loading</div>
        ) : (
          <div>No chat history</div>
        )}
      </div>

      <MessageInput />
    </>
  );
};

export default ChatContainer;
