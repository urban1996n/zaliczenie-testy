import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export interface NotificationItem {
  id: number;
  message: string;
  variant: 'success' | 'info' | 'warning' | 'danger';
}

interface NotificationContextType {
  notifications: NotificationItem[];
  showNotification: (message: string, variant?: NotificationItem['variant']) => void;
  removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const removeNotification = (id: number) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((notification) => notification.id !== id),
    );
  };

  const showNotification = (message: string, variant: NotificationItem['variant'] = 'success') => {
    const id = Date.now() + Math.floor(Math.random() * 1000);

    setNotifications((currentNotifications) => [
      ...currentNotifications,
      { id, message, variant },
    ]);

    window.setTimeout(() => {
      removeNotification(id);
    }, 2500);
  };

  const value = useMemo(
    () => ({
      notifications,
      showNotification,
      removeNotification,
    }),
    [notifications],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }

  return context;
};
