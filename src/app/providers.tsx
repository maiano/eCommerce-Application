import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/app/router';

export const AppProvider = () => {
  return (
    <MantineProvider theme={{ fontFamily: 'Open Sans' }}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
};
