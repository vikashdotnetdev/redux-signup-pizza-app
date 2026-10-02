import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearNotification } from '../../features/ui/uiSlice';

export const NotificationToast = () => {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        dispatch(clearNotification());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notification, dispatch]);

  if (!notification) return null;

  return (
    <div className={`toast-container toast-${notification.type}`}>
      <span>{notification.message}</span>
      <button className="toast-close" onClick={() => dispatch(clearNotification())}>
        ✕
      </button>
    </div>
  );
};