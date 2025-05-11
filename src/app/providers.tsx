import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '@/app/router';
import { theme } from '../theme';
import '../index.css';

export const AppProvider = () => {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark"
>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MantineProvider>
  );
};
