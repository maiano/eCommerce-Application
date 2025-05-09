import { MantineProvider } from '@mantine/core';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/router';

export const AppProvider = () => {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans' }}>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};
