import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";

// Define the shape of the AuthContext
interface AuthContextType {
  user: CustomJwtPayload | null;
  authTokens: AuthTokens | null;
  setAuthTokens: Dispatch<SetStateAction<AuthTokens | null>>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  fetchProfileData: () => Promise<void>;
  updateProfile: (updatedProfile: Partial<CustomJwtPayload>) => Promise<void>;
  registerUser: (
    email: string,
    regFname: string,
    regLname: string,
    username: string,
    password: string,
    password2: string,
    profile: Profile
  ) => Promise<void>;

  refreshToken: () => Promise<string | void>;
}

interface Profile {
  age_bracket?: string;
  bio?: string;
  // Add other profile fields to update if meron
}
interface AuthTokens {
  access: string;
  refresh: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
  email: string;
  bio: string;
  full_name: string;
  first_name: string;
  last_name: string;
  profile?: Profile;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

const showAlert = (title: string, icon: "success" | "error", text?: string) => {
  swal.fire({
    title,
    icon,
    text,
    toast: true,
    timer: 3000,
    position: "top-right",
    timerProgressBar: true,
    showConfirmButton: false,
  });
};
// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authTokens, setAuthTokens] = useState<AuthTokens | null>(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens") as string)
      : null
  );
  const [user, setUser] = useState<CustomJwtPayload | null>(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode<CustomJwtPayload>(
          JSON.parse(localStorage.getItem("authTokens") as string).access
        )
      : null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  //LOGIN
  const loginUser = async (email: string, password: string) => {
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
          errorMessage =
            errorData.detail || "Bad request. Please check your input.";
        } else if (response.status === 404) {
          errorMessage = "Account does not exist";
        }
  
        showAlert(errorMessage, "error");
        throw new Error(errorMessage); // Ensure detailed error message is thrown
      }
  
      const data: AuthTokens = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode<CustomJwtPayload>(data.access));
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


 //REGISTER
const registerUser = async (
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

    if (response.status === 201) {
      navigate("/registration");
      showAlert("Registration Successful, Login Now", "success");
    } else if (response.status === 400) {
      const errorData = await response.json();

      if (errorData.email) {
        showAlert("Email already exists", "error", errorData.email);
      } else {
        showAlert("An Error Occurred", "error", "Please check your input and try again.");
      }
    } else {
      showAlert("An Unexpected Error Occurred", "error");
    }
  } catch (error) {
    console.error("Registration failed:", error);
  }
};

//LOGOUT
const logoutUser = useCallback(() => {
  setAuthTokens(null);
  setUser(null);

  localStorage.removeItem("authTokens");
  navigate("/registration");
  showAlert("You have been logged out...", "success");
}, [navigate]);


//REFRESHTOKEN
const refreshToken = useCallback(async () => {
  const apiUrl = import.meta.env.VITE_AUTHENTICATION_REFRESH_TOKEN_API;

  if (!apiUrl || !authTokens?.refresh) {
    console.error("API URL or refresh token not defined");
    return;
  }

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: authTokens.refresh }),
    });

    if (response.ok) {
      const data: AuthTokens = await response.json();
      setAuthTokens(data);
      setUser(jwtDecode<CustomJwtPayload>(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      console.log("Success refreshing token");
      return data.access;
    } else {
      console.error("Failed to refresh token");
      logoutUser();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
  }
}, [authTokens?.refresh, logoutUser, setAuthTokens, setUser]);
const getExpiryTime = (token: string) => {
  const decodedToken = jwtDecode<CustomJwtPayload>(token);
  return decodedToken.exp ? decodedToken.exp * 1000 : null;
};

// Efficiently handle token refreshing based on access token expiry
useEffect(() => {
  if (authTokens?.access) {
    const accessExpiryTime = getExpiryTime(authTokens.access);
    if (!accessExpiryTime) return;

    const currentTime = Date.now();
    const timeUntilExpiry = accessExpiryTime - currentTime;

    // Set refresh interval to trigger before the token expires ( sample ay : 1 minute before)
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
  setLoading(false); // Loading only after token check
}, [authTokens?.access]);

// User inactivity handler (Auto-logout)
useEffect(() => {
  const excludedPaths = ["/", "/register"];
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
      clearTimeout(logoutTimer); // Ensure proper cleanup
    };
  }
}, [location.pathname, logoutUser]);


  const fetchProfileData = useCallback(async () => {
    // console.log('Auth Tokens in fetchProfileData:', authTokens); // Log tokens here
    if (!authTokens) {
      console.error("No authentication tokens available.");
      return;
    }

    const apiUrl = import.meta.env.VITE_USER_PROFILE_API;
    if (!apiUrl) {
      console.error("API URL for user profile is not defined.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser); // Update the context or state with new user profile data
      } else {
        console.error("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }, [authTokens]);

  useEffect(() => {
    if (authTokens) {
      fetchProfileData(); // Fetch user profile when tokens are available
    }
  }, [authTokens, fetchProfileData]);

  //UPDATE
  const updateProfile = async (updatedProfile: Partial<CustomJwtPayload>) => {
    if (!authTokens) {
      console.error("No authentication tokens available.");
      return;
    }
  
    const apiUrl = import.meta.env.VITE_UPDATE_PROFILE_API;
    if (!apiUrl) {
      console.error("API URL for updating profile is not defined.");
      return;
    }
  
    const payload = {
      username: updatedProfile.username,
      email: updatedProfile.email,
      first_name: updatedProfile.first_name,
      last_name: updatedProfile.last_name,
      profile: {
        age_bracket: updatedProfile.profile?.age_bracket,
        bio: updatedProfile.profile?.bio,
      },
    };
  
    console.log("Payload being sent:", payload);
  
    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${authTokens.access}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(prevUser => ({
          ...prevUser,
          ...updatedUser,
        }));
        showAlert("Profile Updated", "success");
      } else {
        let errorMessage = 'Failed to update profile';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || 'Unknown error occurred';
        } catch {
          errorMessage = 'Failed to parse error response';
        }
        console.error(errorMessage);
        showAlert("Update Failed", "error", errorMessage);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      showAlert("Update Failed", "error", "An unexpected error occurred. Please try again.");
    }
  };
  

  const contextData: AuthContextType = {
    user,
    authTokens,
    setAuthTokens,
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
    fetchProfileData,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
