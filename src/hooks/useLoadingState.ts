import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setLoading } from '../store/slices/uiSlice';

/**
 * Custom hook for managing loading states via Redux
 * 
 * @param {string} key - Unique identifier for the loading state
 * @returns {object} Loading state and functions to control it
 */
export const useLoadingState = (key: string) => {
  const dispatch = useAppDispatch();
  const loadingStates = useAppSelector(state => state.ui.loadingStates);
  const isLoading = !!loadingStates[key];
  
  // Start loading
  const startLoading = useCallback(() => {
    dispatch(setLoading({ key, isLoading: true }));
  }, [dispatch, key]);
  
  // Stop loading
  const stopLoading = useCallback(() => {
    dispatch(setLoading({ key, isLoading: false }));
  }, [dispatch, key]);
  
  // Utility to wrap async functions with loading state
  const withLoading = useCallback(
    async <T,>(asyncFn: () => Promise<T>): Promise<T> => {
      try {
        startLoading();
        return await asyncFn();
      } finally {
        stopLoading();
      }
    },
    [startLoading, stopLoading]
  );
  
  return {
    isLoading,
    startLoading,
    stopLoading,
    withLoading,
  };
};

export default useLoadingState; 