// import {AuthTokens, CustomJwtPayload} from '../types/AuthTypes';

// export const updateProfilePicture = async (
//   imageUrl: string,
//   authTokens: AuthTokens,
//   // refreshToken: () => Promise<void>,
//   setUser: (user: CustomJwtPayload | null) => void
// ): Promise<void> => {
//   if (!authTokens) {
//     console.error('No authentication tokens available');
//     return;
//   }

//   const payload = {
//     profile: {
//       profile_image: imageUrl
//     }
//   };

//   console.log('Payload being sent:', payload);

//   const apiUrl = import.meta.env.VITE_UPDATE_PROFILE_API;
//   if (!apiUrl) {
//     console.error('API URL for updating profile is not defined.');
//     return;
//   }

//   try {
//     const response = await fetch(apiUrl, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${authTokens.access}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(payload)
//     });

//     const responseBody = await response.text();
//     if (response.ok) {
//       const updatedUser = JSON.parse(responseBody);
//       setUser(updatedUser); // Update the user profile with the new image URL
//       console.log('Profile picture updated successfully');
//       // await refreshToken();
//     } else {
//       console.error('Error updating profile picture');
//       throw new Error('Failed to update profile picture');
//     }
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.error('Error updating profile picture:', error.message);
//       throw new Error(error.message);
//     } else {
//       console.error(
//         'Unknown error occurred while updating profile picture:',
//         error
//       );
//       throw new Error('An unknown error occurred');
//     }
//   }
// };
import { AuthTokens, CustomJwtPayload } from '../types/AuthTypes';

export const updateProfilePicture = async (
  imageUrl: string,
  authTokens: AuthTokens,
  setUser: (user: CustomJwtPayload | null) => void
): Promise<void> => {
  if (!authTokens) {
    console.error('No authentication tokens available');
    return;
  }

  const payload = {
    profile: {
      profile_image: imageUrl
    }
  };

  console.log('Payload being sent:', payload);

  const apiUrl = import.meta.env.VITE_UPDATE_PROFILE_API;
  if (!apiUrl) {
    console.error('API URL for updating profile is not defined.');
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const responseBody = await response.text();

    if (response.ok) {
      // Parse the response assuming the user data might be nested
      const updatedData = JSON.parse(responseBody);

      // If the updated user information is nested in a "user" key, extract it
      const updatedUser = updatedData.user ? updatedData.user : updatedData;

      setUser(updatedUser); // Update the user state with the new profile data
      console.log('Profile picture updated successfully');
    } else {
      console.error('Error updating profile picture');
      throw new Error('Failed to update profile picture');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating profile picture:', error.message);
      throw new Error(error.message);
    } else {
      console.error(
        'Unknown error occurred while updating profile picture:',
        error
      );
      throw new Error('An unknown error occurred');
    }
  }
};
