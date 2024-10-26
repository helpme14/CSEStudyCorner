// loginUser.ts
import { AuthTokens, CustomJwtPayload } from '../types/AuthTypes'; // Adjust the import path
import { showAlert } from '../utils/showAlert';
import { jwtDecode } from 'jwt-decode';
import { NavigateFunction } from 'react-router-dom'; // Import NavigateFunction type


export const loginUser = async (
  email: string,
  password: string,
  setAuthTokens: (tokens: AuthTokens | null) => void,
  setUser: (user: CustomJwtPayload | null) => void,
  navigate: NavigateFunction // Accept navigate as a parameter
) => {
  const apiUrl = import.meta.env.VITE_AUTHENTICATION_TOKEN_API;
  if (!apiUrl) {
    console.error("Authentication API URL is not defined");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error data:", errorData);

      let errorMessage = "An error occurred during login";
      if (response.status === 401) {
        errorMessage = errorData.detail || "Invalid email or password";
      } else if (response.status === 400) {
        errorMessage = errorData.detail || "Bad request. Please check your input.";
      } else if (response.status === 404) {
        errorMessage = "Account does not exist";
      }

    const data = await response.json();
    
    if (data.access) {
      // Update auth tokens and save to local storage
      localStorage.setItem("authTokens", JSON.stringify(data));
    }

      showAlert(errorMessage, "error");
      throw new Error(errorMessage);
    }

    const data: AuthTokens = await response.json();
    

    setAuthTokens(data);
    setUser(jwtDecode<CustomJwtPayload>(data.access));

    console.log("Response Data:", data);
    const user = jwtDecode<CustomJwtPayload>(data.access);
    console.log("Decoded User Data:", user); // Log the decoded user data


    localStorage.setItem("authTokens", JSON.stringify(data));
    navigate("/home");
    showAlert("Login Successful", "success");
  } catch (error) {
    console.error("Login error:", error);

    let errorMessage = "An unexpected error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    showAlert(errorMessage, "error");
  }
};
