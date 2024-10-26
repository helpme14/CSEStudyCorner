// fetchProfileData.ts
import { AuthTokens, CustomJwtPayload } from '../types/AuthTypes';

export const fetchProfileData = async (
  authTokens: AuthTokens | null
): Promise<CustomJwtPayload | null> => {
  if (!authTokens) {
    console.error('No authentication tokens available.');
    return null;
  }

  const apiUrl = import.meta.env.VITE_USER_PROFILE_API;
  if (!apiUrl) {
    console.error('API URL for user profile is not defined.');
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const updatedUser: CustomJwtPayload = await response.json();
      console.log('Fetched profile data:', updatedUser);
      return updatedUser; // Return the fetched user profile data
    } else {
      console.error('Failed to fetch user profile:', response.statusText);
      return null; // Return null in case of error
    }
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null; // Return null in case of error
  }
};
