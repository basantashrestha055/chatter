import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from './useAuthStore';

export const useChatStore = create((set, get) => ({
  chatPartners: [],
  allContacts: [],
  messages: [],
  activeTab: 'chats',
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (user) => set({ selectedUser: user }),

  fetchChatPartners: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get('/messages/chats');
      set({ chatPartners: response.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  fetchAllContacts: async () => {
    set({ isUsersLoading: true });
    try {
      const response = await axiosInstance.get('/messages/contacts');
      set({ allContacts: response.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ isUsersLoading: false });
    }
  },

  fetchMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();

    try {
      const response = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: messages.concat(response.data) });
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    }
  },

  listenToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;

      const currentMsg = get().messages;
      set({ messages: [...currentMsg, newMessage] });
    });
  },

  unListenToMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },
}));
