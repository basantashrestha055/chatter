import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { io } from 'socket.io-client';
import { axiosInstance } from '../lib/axios';

const BASE_URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5000' : '/';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: false,
  isSigningUp: false,
  isLoggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axiosInstance.get('/auth/check');
      set({ authUser: response.data });
      get().connectSocket();
    } catch (error) {
      console.log('Error checking auth: ', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (signupData) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post('/auth/signup', signupData);
      set({ authUser: response.data });
      toast.success('Signup successful');
      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (loginData) => {
    set({ isLoggingIn: true });
    try {
      const response = await axiosInstance.post('/auth/login', loginData);
      set({ authUser: response.data });
      toast.success('Login successful');
      get().connectSocket();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
      toast.success('Logout successful');
      get().disconnectSocket();
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  },

  updateUser: async (data) => {
    try {
      const response = await axiosInstance.put('/auth/update-profile', data);
      set({ authUser: response.data });
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Something went wrong. Please try again later.'
      );
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true,
    });

    socket.connect();
    set({ socket });

    // listen for online users
    socket.on('getOnlineUsers', (fullName) => {
      set({ onlineUsers: fullName });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket?.disconnect();
  },
}));
