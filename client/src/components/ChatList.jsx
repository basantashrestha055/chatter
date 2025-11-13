import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatList = () => {
  const { setSelectedUser, fetchChatPartners, chatPartners, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    fetchChatPartners();
  }, [fetchChatPartners]);

  if (isUsersLoading)
    return (
      <div className='flex items-center justify-center my-4'>
        <span className='loading loading-spinner loading-md'></span>
      </div>
    );

  if (chatPartners.length === 0)
    return (
      <div className='flex items-center justify-center my-4'>
        <span className='text-lg'>No connected users</span>
      </div>
    );

  return (
    <>
      {chatPartners.map((partner) => (
        <div
          key={partner._id}
          className='py-5 px-4 bg-slate-200/20 hover:bg-slate-400/20 rounded-lg cursor-pointer select-none'
          onClick={() => setSelectedUser(partner)}
        >
          <div className='flex items-center gap-5'>
            <div
              className={`avatar ${
                onlineUsers.includes(partner.fullName) ? 'online' : 'offline'
              } w-10 h-10`}
            >
              <img
                src={partner.profilePic || '/default.jpg'}
                alt='user-img'
                className='w-full rounded-full'
              />
            </div>
            <span className='font-medium text-lg'>{partner.fullName}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
