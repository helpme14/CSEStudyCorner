import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useNavigate, useLocation } from "react-router-dom";
import swal from "sweetalert2";

// Define the shape of the AuthContext
interface AuthContextType {
  user: CustomJwtPayload | null;
  authTokens: AuthTokens | null;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  registerUser: (
    email: string,
    regFname: string,
    regLname: string,
    username: string,
    password: string,
    password2: string,
    profile: { age_bracket: string }
  ) => Promise<void>;
  refreshToken: () => Promise<string | void>;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface CustomJwtPayload extends JwtPayload {
  id: number;
  username: string;
  email: string;
}

// Create the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;

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

    console.log("Making request to:", apiUrl);
    console.log("Payload:", JSON.stringify({ email, password }));

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response:", response);

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

        swal.fire({
          title: errorMessage,
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });

        throw new Error(errorMessage); // Ensure detailed error message is thrown
      }

      const data: AuthTokens = await response.json();
      console.log("Response Data:", data);

      setAuthTokens(data);
      setUser(jwtDecode<CustomJwtPayload>(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/home");

      swal.fire({
        title: "Login Successful",
        icon: "success",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "An unexpected error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      swal.fire({
        title: errorMessage,
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const registerUser = async (
    email: string,
    first_name: string,
    last_name: string,
    username: string,
    password: string,
    password2: string,

    profile: { age_bracket: string }
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
        swal.fire({
          title: "Registration Successful, Login Now",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else if (response.status === 400) {
        // Parse the response to get the error details
        const errorData = await response.json();

        if (errorData.email) {
          swal.fire({
            title: "Email already exists",
            text: errorData.email, // Assuming it's a list of error messages
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          swal.fire({
            title: "An Error Occurred",
            text: "Please check your input and try again.",
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      } else {
        swal.fire({
          title: "An Unexpected Error Occurred",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setUser(null);

    localStorage.removeItem("authTokens");
    navigate("/registration");
    swal.fire({
      title: "You have been logged out...",
      icon: "success",
      toast: true,
      timer: 3000,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }, [navigate]);

  const refreshToken = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_AUTHENTICATION_REFRESH_TOKEN_API;

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
        body: JSON.stringify({ refresh: authTokens?.refresh }),
      });
      const data: AuthTokens = await response.json();

      if (response.status === 200) {
        setAuthTokens(data);
        setUser(jwtDecode<CustomJwtPayload>(data.access));
        localStorage.setItem("authTokens", JSON.stringify(data));
        return data.access;
      } else {
        logoutUser();
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutUser();
    }
  }, [authTokens, setAuthTokens, setUser, logoutUser]);

  useEffect(() => {
    if (authTokens) {
      // Start the interval to refresh the token periodically
      const interval = setInterval(() => {
        refreshToken();
      }, 4 * 60 * 1000); // 4 minutes

      // Cleanup function to clear the interval on component unmount or authTokens change
      return () => clearInterval(interval);
    }
  }, [authTokens, refreshToken]);

  useEffect(() => {
    if (authTokens) {
      setUser(jwtDecode<CustomJwtPayload>(authTokens.access));
    }
    setLoading(false);
  }, [authTokens]);

  useEffect(() => {
    let logoutTimer: NodeJS.Timeout;

    const handleActivity = () => {
      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
      logoutTimer = setTimeout(logoutUser, 5 * 60 * 1000); // 5 minutes
    };

    if (location.pathname === "/home") {
      window.addEventListener("mousemove", handleActivity);
      window.addEventListener("keydown", handleActivity);
      window.addEventListener("click", handleActivity);

      handleActivity(); // Start timer immediately

      return () => {
        window.removeEventListener("mousemove", handleActivity);
        window.removeEventListener("keydown", handleActivity);
        window.removeEventListener("click", handleActivity);
        if (logoutTimer) {
          clearTimeout(logoutTimer);
        }
      };
    }
  }, [location.pathname, logoutUser]);

  const contextData: AuthContextType = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    registerUser,
    refreshToken,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
