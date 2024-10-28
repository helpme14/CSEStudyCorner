// Function to update profile without requiring passwords

import { AuthTokens, CustomJwtPayload } from '../types/AuthTypes';
import { showAlert } from '../utils/showAlert';


// export const updateProfileWithoutPasswordAction = async (
//     updatedProfile: Partial<CustomJwtPayload>,
//     authTokens: AuthTokens | null,
//     setUser: (user: CustomJwtPayload | null) => void,
//     refreshToken: () => Promise<void>
//   ) => {
//     try {
//       const response = await fetch(import.meta.env.VITE_USER_AUTHE_NO_CHANGE_PASSWORD, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authTokens?.access}`,
//         },
//         body: JSON.stringify(updatedProfile),
//       });
  
//       if (!response.ok) {
//         throw new Error("Failed to update profile without password");
//       }
      
//       await refreshToken();
//       const updatedUser = await response.json();
      
//       setUser(updatedUser);
      

//       const accessToken = authTokens?.access; // Ensure you have the updated token here
//       console.log("Access Token After Refresh:", accessToken); 

//       // Retrieve updated tokens and ensure it's not null before parsing
//       const storedAuthTokens = localStorage.getItem("authTokens");

//       if (storedAuthTokens) {
//         const newAuthTokens = JSON.parse(storedAuthTokens); // Now it's safe to parse
//         console.log("New Access Token After Refresh:", newAuthTokens.access);
//       } else {
//         console.error("No authTokens found in localStorage.");
//       }

      
//       console.log("Updated User Data:", updatedUser);


//       showAlert("Profile Updated", "success");
//     } catch (error) {
//       console.error("Error updating profile:", error);
//       showAlert("Update Failed", "error", "Error updating profile");
//     }
//   };
export const updateProfileWithoutPasswordAction = async (
  updatedProfile: Partial<CustomJwtPayload>,
  authTokens: AuthTokens | null,
  setUser: (user: CustomJwtPayload | null) => void,
  refreshToken: () => Promise<void>
) => {
  try {
    const response = await fetch(import.meta.env.VITE_USER_AUTHE_NO_CHANGE_PASSWORD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authTokens?.access}`,
      },
      body: JSON.stringify(updatedProfile),
    });

    if (!response.ok) {
      throw new Error("Failed to update profile without password");
    }

    await refreshToken(); // Refresh tokens if needed
    const updatedUser = await response.json(); // Get the updated user data

    // Update the user state in your app
    setUser(updatedUser);

    // Update local storage with the new user data
    const storedAuthTokens = localStorage.getItem("authTokens");
    if (storedAuthTokens) {
      const newAuthTokens = JSON.parse(storedAuthTokens);
      
      // Save the updated user into local storage
      localStorage.setItem("authTokens", JSON.stringify({
        ...newAuthTokens,
        user: updatedUser, // Save the updated user data here
      }));
    } else {
      console.error("No authTokens found in localStorage.");
    }

    console.log("Updated User Data:", updatedUser); // Log for debugging
    showAlert("Profile Updated", "success"); // Show success message
  } catch (error) {
    console.error("Error updating profile:", error);
    showAlert("Update Failed", "error", "Error updating profile");
  }
};

