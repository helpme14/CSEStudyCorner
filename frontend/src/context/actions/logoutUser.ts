import {showAlert} from '../utils/showAlert'; // Adjust the import path
import {AuthTokens, CustomJwtPayload} from '../types/AuthTypes'; // Adjust the import path
import {NavigateFunction} from 'react-router-dom';

export const logoutUser = (
  setAuthTokens: (tokens: AuthTokens | null) => void,
  setUser: (user: CustomJwtPayload | null) => void,
  navigate: NavigateFunction // Explicitly define the type here
) => {
  // Perform logout actions
  setAuthTokens(null);
  setUser(null);

  localStorage.removeItem('authTokens');
  navigate('/registration');
  showAlert('You have been logged out...', 'success');
};
