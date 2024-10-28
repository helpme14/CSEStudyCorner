// AuthContextTenp.tsx
import { createContext } from 'react';
import { AuthContextType } from './types/AuthTypes'; 

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
