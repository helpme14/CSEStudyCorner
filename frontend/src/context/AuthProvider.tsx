// AuthProvider.tsx
import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { AuthContextType, CustomJwtPayload, AuthTokens , Profile } from './types/AuthTypes'; 
import {jwtDecode} from 'jwt-decode'; 
import { loginUser as loginUserAction } from './actions/loginUser'; 
import {logoutUser as logoutUserAction} from './actions/logoutUser'
import {fetchProfileData as fetchProfileDataAction} from './actions/fetchProfileData'
import {refreshToken as refreshTokenAction} from './actions/refreshToken'

import {updateProfile as updateProfileAction } from './actions/updateProfile'
import { updateProfilePicture as updateProfilePictureAction } from './actions/updateProfilePicture';
import { updateProfileWithoutPasswordAction } from './actions/updateProfileNoPassword';
import { useAccountClosure } from './actions/deleteAccount'; // Import your custom hook
import useRegisterUser from './actions/registerUser'

import { useNavigate,useLocation } from 'react-router-dom'; 
import { getExpiryTime } from './utils/getExpiryTime'; // Adjust the import path accordingly
import {showAlert} from './utils/showAlert'
// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create the AuthProvider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

  const location = useLocation(); // Use useLocation to get current pathname
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem('authTokens')
      ? JSON.parse(localStorage.getItem('authTokens') as string)
      : null
  );

  const [user, setUser] = useState<CustomJwtPayload | null>(() =>
    authTokens?.access ? jwtDecode<CustomJwtPayload>(authTokens.access) : null
  );


// LOGIN
  const navigate = useNavigate(); 
  const loginUser = async (email: string, password: string) => {
 
    await loginUserAction(email, password, setAuthTokens, setUser,navigate);
  };
// LOGOUT
const logoutUser = useCallback(() => {
  logoutUserAction(setAuthTokens, setUser, navigate);
}, [navigate, setAuthTokens, setUser]); // Add dependencies here


  const fetchProfileData = useCallback(async (): Promise<CustomJwtPayload | null> => {
    const user = await fetchProfileDataAction(authTokens); // Only pass authTokens now
    if (user) {
      setUser(user); // Now set the user in state
      return user;
    } else {
      console.error('Failed to fetch profile data');
      return null;  // Return null in case of failure
    }
  }, [authTokens]);
  
  // UPDATE PROFILE
  const updateProfile = async (
    updatedProfile: Partial<CustomJwtPayload>, 
    currentPassword: string, // Make required
    newPassword: string // Make required
  ) => {
    if (!authTokens) {
      console.error("No auth tokens available");
      return;
    }
  
    await updateProfileAction(updatedProfile,authTokens, setUser,refreshToken, currentPassword, newPassword  );
  };





  // Function to update profile without requiring passwords
const updateProfileWithoutPassword = async (
  updatedProfile: Partial<CustomJwtPayload>
) => {
  if (!authTokens) {
    console.error("No auth tokens available");
    return;
  }

  // Call the original updateProfileAction with undefined for passwords
  await updateProfileWithoutPasswordAction(updatedProfile, authTokens, setUser, refreshToken);
};



  
  const updateProfilePicture = async (imageUrl: string): Promise<void> => {
    if (!authTokens) return;
    await updateProfilePictureAction(imageUrl, authTokens, setUser,);
    await fetchProfileData();
  };








  const changedPasswordAuthenticatedUser = async (current_password: string, new_password: string) => {
    // Placeholder for the changedPasswordAuthenticatedUser action
  };






  const registerUser = useRegisterUser(setAuthTokens, setUser, showAlert, navigate);




  const refreshToken = useCallback(async () => {
    if (authTokens) {
      const updatedUser = await refreshTokenAction(
        authTokens, 
        setAuthTokens, 
        setUser, 
        logoutUser,
        fetchProfileData 
      );
      console.log("here is updated info after refresh", updatedUser);
    }
  }, [authTokens, setAuthTokens, setUser, logoutUser, fetchProfileData]);
  // Token expiration check and refresh logic
  useEffect(() => {
    if (authTokens?.access) {
      const accessExpiryTime = getExpiryTime(authTokens.access);
      if (!accessExpiryTime) return;

      const currentTime = Date.now();
      const timeUntilExpiry = accessExpiryTime - currentTime;

      const refreshBeforeExpiry = Math.max(timeUntilExpiry - 60 * 1000, 0);

      const interval = setTimeout(refreshToken, refreshBeforeExpiry);

      return () => clearTimeout(interval);
    }
  }, [authTokens?.access, refreshToken]);

  // Automatically decode user from the access token
  useEffect(() => {
    if (authTokens?.access) {
      setUser(jwtDecode<CustomJwtPayload>(authTokens.access));
    }
  }, [authTokens?.access]);

   // User inactivity handler (Auto-logout)
   useEffect(() => {
    const excludedPaths = ["/", "/registration"];
    let logoutTimer: NodeJS.Timeout;

    const handleActivity = () => {
      if (logoutTimer) clearTimeout(logoutTimer);
      logoutTimer = setTimeout(logoutUser, 10 * 60 * 1000); // 10 minutes
    };

    if (!excludedPaths.includes(location.pathname)) {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);

      handleActivity(); // Initialize on first load

      return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
        clearTimeout(logoutTimer); 
      };
    }
  }, [location.pathname, logoutUser]);

  const profileImage = user?.profile_image || null;


  const { handleAccountClosure } = useAccountClosure({ authTokens, logoutUser });


  const contextData: AuthContextType = {
    user,
    authTokens,
    setAuthTokens,
    setUser,
    loginUser,
    logoutUser,
    updateProfile,
    fetchProfileData,
    updateProfileWithoutPassword,
    updateProfilePicture,
    changedPasswordAuthenticatedUser,
    registerUser,
    refreshToken,
    profileImage,
    handleAccountClosure,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext }; 
export default AuthContext;
