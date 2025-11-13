import React from 'react';
import { useChatStore } from '../store/useChatStore';

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab, chatPartners, allContacts } = useChatStore();

  return (
    <div className='tabs tabs-boxed p-2 my-2 w-full'>
      <button
        onClick={() => setActiveTab('chats')}
        className={`tab font-medium w-1/2 ${
          activeTab === 'chats' && 'bg-slate-200/20 text-accent'
        }`}
      >
        Chats ({chatPartners.length})
      </button>
      <button
        onClick={() => setActiveTab('contacts')}
        className={`tab font-medium w-1/2 ${
          activeTab === 'contacts' && 'bg-slate-200/20 text-accent'
        }`}
      >
        Contacts ({allContacts.length})
      </button>
    </div>
  );
};

export default ActiveTabSwitch;
