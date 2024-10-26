import { AuthTokens, CustomJwtPayload, ProfileUpdatePayload } from '../types/AuthTypes';
import { showAlert } from '../utils/showAlert';

export const updateProfile = async (
  updatedProfile: Partial<CustomJwtPayload>, 
  authTokens: AuthTokens | null,  // Move this before optional parameters
  setUser: (user: CustomJwtPayload | null) => void, 
  refreshToken: () => Promise<void>,
  currentPassword?: string,  // Now these can follow
  newPassword?: string
) => {
  // Check if authentication tokens are available
  if (!authTokens) {
    console.error("No authentication tokens available.");
    return;
  }

  const apiUrl = import.meta.env.VITE_UPDATE_PROFILE_API;
  if (!apiUrl) {
    console.error("API URL for updating profile is not defined.");
    return;
  }

  // Ensure current password is provided
  if (!currentPassword) {
    console.error("Current password must be provided to update profile.");
    showAlert("Update Failed", "error", "Current password must be provided.");
    return;
  }

  // Construct the payload with profile fields
  const profile = {
    age_bracket: updatedProfile.profile?.age_bracket,
    bio: updatedProfile.profile?.bio,
  };


  const payload: ProfileUpdatePayload = {
    username: updatedProfile.username,
    email: updatedProfile.email,
    first_name: updatedProfile.first_name,
    last_name: updatedProfile.last_name,
    profile, // Include the profile object
    current_password: currentPassword, // Always include current_password
    ...(newPassword ? { new_password: newPassword } : {}), // Include new_password if provided
  };

  console.log("Payload being sent:", payload);

  try {
    console.log("Payload being sent lololol:", JSON.stringify(payload, null, 2));
    const response = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      // Successfully updated profile data
      const updatedUser: CustomJwtPayload = await response.json();

      // Merge the current user state with updated user data
      const newUser = { 
        // ...currentUser, 
        ...updatedUser 
      };

      setUser(newUser); // Set the updated user data
      
      // Only call refreshToken after data has been modified
      await refreshToken();

      showAlert("Profile Updated", "success");
    } else {
      let errorMessage = 'Failed to update profile';
      try {
        const errorData = await response.json();

        // Handle specific password-related errors
        if (errorData?.non_field_errors) {
          errorMessage = errorData.non_field_errors[0];
        } else if (errorData?.current_password) {
          errorMessage = errorData.current_password[0];
        } else if (errorData?.new_password) {
          errorMessage = errorData.new_password[0];
        }

        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = 'Failed to parse error response';
      }

      console.error('Update error:', errorMessage);
      showAlert("Update Failed", "error", errorMessage);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    showAlert("Update Failed", "error", "An unexpected error occurred. Please try again.");
  }
};
