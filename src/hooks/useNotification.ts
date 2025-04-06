import { useCallback } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addNotification, NotificationSeverity } from '../store/slices/uiSlice';

/**
 * Custom hook for displaying notifications via Redux
 * 
 * @returns {object} Functions to display different types of notifications
 */
export const useNotification = () => {
  const dispatch = useAppDispatch();
  
  // Show a notification with specified severity
  const showNotification = useCallback(
    (message: string, severity: NotificationSeverity = 'info', duration = 5000) => {
      dispatch(
        addNotification({
          message,
          severity,
          duration,
        })
      );
    },
    [dispatch]
  );
  
  // Helper methods for different severity levels
  const showError = useCallback(
    (message: string, duration = 5000) => {
      showNotification(message, 'error', duration);
    },
    [showNotification]
  );
  
  const showWarning = useCallback(
    (message: string, duration = 5000) => {
      showNotification(message, 'warning', duration);
    },
    [showNotification]
  );
  
  const showInfo = useCallback(
    (message: string, duration = 5000) => {
      showNotification(message, 'info', duration);
    },
    [showNotification]
  );
  
  const showSuccess = useCallback(
    (message: string, duration = 5000) => {
      showNotification(message, 'success', duration);
    },
    [showNotification]
  );
  
  // Utility to handle error and show notification
  const handleError = useCallback(
    (err: unknown, defaultMessage = 'An error occurred') => {
      const errorMessage = err instanceof Error ? err.message : defaultMessage;
      showError(errorMessage);
      console.error(err);
      return errorMessage;
    },
    [showError]
  );
  
  return {
    showNotification,
    showError,
    showWarning,
    showInfo,
    showSuccess,
    handleError,
  };
};

export default useNotification; 