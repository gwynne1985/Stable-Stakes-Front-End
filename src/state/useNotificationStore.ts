// If you see an import error for 'zustand', run: npm install zustand @types/zustand
import { create } from 'zustand';

export interface Notification {
  id: string;
  user_id?: string;
  type: string; // e.g., 'score_approved', 'redemption_requested', etc.
  title: string;
  body: string;
  read: boolean;
  timestamp: number; // Unix epoch or Date.now()
  [key: string]: any; // For any extra payload
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set: (fn: (state: NotificationStore) => Partial<NotificationStore> | NotificationStore) => void) => ({
  notifications: [],
  addNotification: (notification: Notification) =>
    set((state: NotificationStore) => ({
      notifications: [notification, ...state.notifications],
    })),
  markAsRead: (id: string) =>
    set((state: NotificationStore) => ({
      notifications: state.notifications.map((n: Notification) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  markAllAsRead: () =>
    set((state: NotificationStore) => ({
      notifications: state.notifications.map((n: Notification) => ({ ...n, read: true })),
    })),
  clearNotifications: () => set(() => ({ notifications: [] })),
})); 