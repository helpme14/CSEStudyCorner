import { AuthTokens, CustomJwtPayload } from '../types/AuthTypes';

export const refreshToken = async (
  authTokens: AuthTokens | null,
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>,
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | null>>,
  logoutUser: () => void,
  fetchProfileData: () => Promise<CustomJwtPayload | null>
) => {
  const apiUrl = import.meta.env.VITE_AUTHENTICATION_REFRESH_TOKEN_API;

  // Check for missing API URL or refresh token
  if (!apiUrl || !authTokens?.refresh) {
    console.error("API URL or refresh token not defined");
    logoutUser(); // Log out if refresh token is missing
    return;
  }

  try {
    // Make request to refresh token
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });

    if (response.ok) {
      // Parse the new tokens
      const data: AuthTokens = await response.json();
      setAuthTokens(data); // Update state with the new tokens
      localStorage.setItem("authTokens", JSON.stringify(data)); // Save new tokens in localStorage

      // Fetch updated user profile data after refreshing the token
      const updatedUser = await fetchProfileData();

      if (updatedUser) {
        setUser(updatedUser); // Update state with new user data
        console.log("Successfully refreshed token and updated user profile");
        return updatedUser; // Return updated user information
      } else {
        console.error("Failed to fetch updated user profile");
        logoutUser(); // Log out if user data fetching fails
      }
    } else {
      console.error("Failed to refresh token, logging out...");
      logoutUser(); // Log out if token refresh fails
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser(); // Log out if an error occurs during the refresh process
  }
};
