import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';

const ContactList = () => {
  const { setSelectedUser, fetchAllContacts, allContacts, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    fetchAllContacts();
  }, [fetchAllContacts]);

  if (isUsersLoading)
    return (
      <div className='flex items-center justify-center my-4'>
        <span className='loading loading-spinner loading-md'></span>
      </div>
    );

  if (allContacts.length === 0)
    return (
      <div className='flex items-center justify-center my-4'>
        <span className='text-lg'>No contacts found</span>
      </div>
    );

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className='p-4 bg-slate-200/20 hover:bg-slate-400/20 rounded-lg cursor-pointer select-none'
          onClick={() => setSelectedUser(contact)}
        >
          <div className='flex items-center gap-5'>
            <div
              className={`avatar ${
                onlineUsers.includes(contact.fullName) ? 'online' : 'offline'
              } w-10 h-10`}
            >
              <img
                src={contact.profilePic || '/default.jpg'}
                alt='user-img'
                className='w-full rounded-full'
              />
            </div>
            <span className='font-medium text-lg'>{contact.fullName}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
