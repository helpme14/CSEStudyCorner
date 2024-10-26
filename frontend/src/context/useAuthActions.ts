import {AuthTokens, CustomJwtPayload, Profile} from './types/AuthTypes';
import {showAlert} from './utils/showAlert';
import {useNavigate} from 'react-router-dom';

// Define API URLs (these can also be imported from environment variables)
const API_URLS = {
  login: import.meta.env.VITE_AUTHENTICATION_TOKEN_API,
  register: import.meta.env.VITE_AUTHENTICATION_REGISTER_API,
  refreshToken: import.meta.env.VITE_AUTHENTICATION_REFRESH_TOKEN_API,
  userProfile: import.meta.env.VITE_USER_PROFILE_API,
  updateProfile: import.meta.env.VITE_UPDATE_PROFILE_API,
  changePassword: import.meta.env.VITE_USER_AUTHE_CHANGE_PASSWORD
};

// Define action functions
export const loginUser = async (
  email: string,
  password: string
): Promise<AuthTokens | void> => {
  if (!API_URLS.login) {
    console.error('Authentication API URL is not defined');
    return;
  }

  try {
    const response = await fetch(API_URLS.login, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });

    if (!response.ok) {
      const errorData = await response.json();
      showAlert(errorData.detail || 'Login failed', 'error');
      throw new Error(errorData.detail);
    }

    const data: AuthTokens = await response.json();
    showAlert('Login Successful', 'success');
    return data;
  } catch (error) {
    console.error('Login error:', error);
    showAlert('An unexpected error occurred during login', 'error');
  }
};

export const registerUser = async (
  email: string,
  first_name: string,
  last_name: string,
  username: string,
  password: string,
  password2: string,
  profile: Profile
): Promise<void> => {
  if (!API_URLS.register) {
    console.error('API URL for registration is not defined');
    return;
  }

  try {
    const response = await fetch(API_URLS.register, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email,
        first_name,
        last_name,
        username,
        password,
        password2,
        profile
      })
    });

    if (response.status === 201) {
      showAlert('Registration Successful, Login Now', 'success');
    } else {
      const errorData = await response.json();
      showAlert(
        errorData.email ? 'Email already exists' : 'An Error Occurred',
        'error'
      );
    }
  } catch (error) {
    console.error('Registration failed:', error);
  }
};

export const useAuthActions = () => {
  const navigate = useNavigate();

  const logoutUser = useCallback(() => {
    // Clear user and token state
    localStorage.removeItem('authTokens');
    showAlert('You have been logged out...', 'success');
    navigate('/registration'); // Redirect to registration after logout
  }, [navigate]);

  return {
    logoutUser
  };
};

export const refreshToken = async (
  refreshToken: string
): Promise<AuthTokens | void> => {
  if (!API_URLS.refreshToken) {
    console.error('API URL for refresh token is not defined');
    return;
  }

  try {
    const response = await fetch(API_URLS.refreshToken, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({refresh: refreshToken})
    });

    if (response.ok) {
      const data: AuthTokens = await response.json();
      return data;
    } else {
      console.error('Failed to refresh token');
      logoutUser();
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    logoutUser();
  }
};

export const fetchProfileData = async (
  authTokens: AuthTokens
): Promise<CustomJwtPayload | void> => {
  if (!API_URLS.userProfile) {
    console.error('API URL for user profile is not defined');
    return;
  }

  try {
    const response = await fetch(API_URLS.userProfile, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const updatedUser: CustomJwtPayload = await response.json();
      return updatedUser;
    } else {
      console.error('Failed to fetch user profile');
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};

export const updateProfile = async (
  authTokens: AuthTokens,
  updatedProfile: Partial<CustomJwtPayload>,
  currentPassword?: string,
  newPassword?: string
): Promise<void> => {
  if (!API_URLS.updateProfile) {
    console.error('API URL for updating profile is not defined.');
    return;
  }

  const payload = {
    username: updatedProfile.username,
    email: updatedProfile.email,
    first_name: updatedProfile.first_name,
    last_name: updatedProfile.last_name,
    profile: {
      age_bracket: updatedProfile.profile?.age_bracket,
      bio: updatedProfile.profile?.bio
    },
    ...(currentPassword && newPassword
      ? {current_password: currentPassword, new_password: newPassword}
      : {})
  };

  try {
    const response = await fetch(API_URLS.updateProfile, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      showAlert(errorData.message || 'Failed to update profile', 'error');
    } else {
      showAlert('Profile Updated', 'success');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    showAlert('An unexpected error occurred while updating profile', 'error');
  }
};

export const changedPasswordAuthenticatedUser = async (
  authTokens: AuthTokens,
  current_password: string,
  new_password: string
): Promise<void> => {
  if (!API_URLS.changePassword) {
    console.error('API URL for changing password is not defined');
    return;
  }

  const payload = {current_password, new_password};

  try {
    const response = await fetch(API_URLS.changePassword, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      showAlert('Password Changed Successfully', 'success');
    } else {
      const errorData = await response.json();
      showAlert(errorData?.message || 'Password change failed', 'error');
    }
  } catch (error) {
    console.error('Password change failed:', error);
    showAlert('An error occurred while changing password', 'error');
  }
};
