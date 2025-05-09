// utils/showToast.ts
import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ShowToastProps {
  type?: ToastType;
  title: string;
  message?: string;
}

export const showToast = ({ type = 'success', title, message }: ShowToastProps): void => {
  Toast.show({
    type,
    text1: title,
    text2: message,
    position: 'top',
  });
};
