import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './Auth.js';
import { ContentProvider } from './AccountPage.js';

function MainProvider({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentProvider>{children}</ContentProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default MainProvider;
