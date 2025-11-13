import React from 'react';
import { Dot } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const LiveUpdate = () => {
  const { onlineUsers } = useAuthStore();

  return (
    <div>
      {onlineUsers.map((userId) => (
        <div key={userId}>
          <p className='text-sm font-medium tracking-wide flex items-center select-none'>
            <span className='text-success'>
              <Dot />
            </span>
            <span className='text-success'>{userId} is online</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default LiveUpdate;
