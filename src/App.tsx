import { useEffect } from 'react';
import { AppProvider } from '@/app/providers';

import '@/shared/lib/commercetools/create-anonymous-client';
import { testRegisterAndLogin } from '@/shared/lib/commercetools/test-register-login';

function App() {
  useEffect(() => {
    testRegisterAndLogin();
  }, []);
  return <AppProvider />;
}

export default App;
