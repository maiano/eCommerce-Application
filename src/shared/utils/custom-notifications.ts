import { notifications } from '@mantine/notifications';

type NotificationOptions = {
  title?: string;
  message: string;
  autoClose?: number;
  withCloseButton?: boolean;
};

export const notifySuccess = (options: NotificationOptions) => {
  notifications.show({
    title: options.title,
    message: options.message,
    color: 'green',
    autoClose: options.autoClose ?? 5000,
    withCloseButton: options.withCloseButton ?? true,
  });
};

export const notifyError = (error: unknown, options: NotificationOptions) => {
  console.error(error);
  notifications.show({
    title: options.title,
    message: options.message,
    color: 'red',
    autoClose: options.autoClose ?? 5000,
    withCloseButton: options.withCloseButton ?? true,
  });
};
