import React from 'react';
import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, messages } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className='h-[80px] bg-slate-400/20 px-6 py-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <div
            className={`avatar ${
              onlineUsers.includes(selectedUser.fullName) ? 'online' : 'offline'
            } w-12 h-12`}
          >
            <img
              src={selectedUser.profilePic || '/default.jpg'}
              alt='user-img'
              className='w-full rounded-full'
            />
          </div>
          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <span className='text-xs'>
              {onlineUsers.includes(selectedUser.fullName)
                ? 'Online'
                : 'Offline'}
            </span>
          </div>
        </div>
        <div className='font-medium'>
          <span className='text-xs'>{messages.length} messages</span>
        </div>
        <div>
          <X className='cursor-pointer' onClick={() => setSelectedUser(null)} />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
