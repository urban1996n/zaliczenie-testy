import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useNotification } from '../Domain/UI/Notification/NotificationContext';

const NotificationCenter: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  if (notifications.length === 0) {
    return null;
  }

  return (
    <Container
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1080, maxWidth: '32rem' }}
    >
      {notifications.map((notification) => (
        <Alert
          key={notification.id}
          variant={notification.variant}
          dismissible
          onClose={() => removeNotification(notification.id)}
          className="shadow-sm"
        >
          {notification.message}
        </Alert>
      ))}
    </Container>
  );
};

export default NotificationCenter;
