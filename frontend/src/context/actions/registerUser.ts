import { useCallback } from 'react';
import { AuthTokens, CustomJwtPayload, Profile } from '../types/AuthTypes';


const useRegisterUser = (
  setAuthTokens: (tokens: AuthTokens | null) => void,
  setUser: (user: CustomJwtPayload | null) => void,
  showAlert: (message: string, type: string, detail?: string) => void,
  navigate: (path: string) => void
) => {
  const registerUser = useCallback(
    async (
      email: string,
      first_name: string,
      last_name: string,
      username: string,
      password: string,
      password2: string,
      profile: Profile
    ) => {
      const apiUrl = import.meta.env.VITE_AUTHENTICATION_REGISTER_API;
      setAuthTokens(null);
      setUser(null);
      localStorage.removeItem("authTokens");

      if (!apiUrl) {
        console.error("API URL is not defined");
        return;
      }

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            first_name,
            last_name,
            username,
            password,
            password2,
            profile,
          }),
        });
        
        const responseData = await response.json(); // Parse the JSON response

      if (response.status === 201) {
        navigate("/registration");
        showAlert("Registration Successful, Login Now", "success");
      } else if (response.status === 400) {
        // Log the full response data for debugging
        console.error("Registration error data:", responseData);

        // Check for specific error messages
        if (responseData.email) {
          showAlert("Email already exists", "error", responseData.email);
        } else if (responseData.username) {
          showAlert("Username already exists", "error", responseData.username);
        } else if (responseData.error) { // Handle general error messages
          showAlert("Registration Error", "error", responseData.error);
        } else {
          // Fallback for other errors
          showAlert("An Error Occurred", "error", responseData.message || "Please check your input and try again.");
        }
      } else {
        showAlert("An Unexpected Error Occurred", "error");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      showAlert("An error occurred while trying to register.", "error");
    }
  },
    [setAuthTokens, setUser, showAlert, navigate]
  );

  return registerUser;
};

export default useRegisterUser;
