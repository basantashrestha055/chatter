import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import NoChat from '../components/NoChat';
import ChatContainer from '../components/ChatContainer';
import LiveUpdate from '../components/LiveUpdate';

const ChatPage = () => {
  const { authUser } = useAuthStore();
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className='min-h-screen h-full'>
      <div className='grid grid-cols-[350px_1fr]'>
        <div className='h-screen border-r border-accent'>
          <div className='grid gap-4 px-2'>
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className='h-[400px] border-b border-accent'>
              {activeTab === 'chats' ? <ChatList /> : <ContactList />}
            </div>

            <LiveUpdate />
          </div>
        </div>
        <div className='h-screen'>
          {selectedUser ? <ChatContainer /> : <NoChat />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
