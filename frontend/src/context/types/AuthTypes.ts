import { JwtPayload } from "jwt-decode";
import { Dispatch, SetStateAction } from 'react';
// AuthTypes.ts
// Define the shape of the AuthContext

 
export interface AuthContextType {
  user: CustomJwtPayload | null;
  authTokens: AuthTokens | null;
  setAuthTokens: React.Dispatch<React.SetStateAction<AuthTokens | null>>;
  setUser: React.Dispatch<React.SetStateAction<CustomJwtPayload | null>>;
  loginUser: (email: string, password: string) => Promise<void>;
  logoutUser: () => void;
  updateProfile: (updatedProfile: Partial<CustomJwtPayload>, currentPassword: string, newPassword: string) => Promise<void>; // Update here
  fetchProfileData: () => Promise<CustomJwtPayload | null>;
  updateProfileWithoutPassword: (updatedProfile: Partial<CustomJwtPayload>) => Promise<void>;
  updateProfilePicture: (imageUrl: string) => Promise<void>;
  changedPasswordAuthenticatedUser: (current_password: string, new_password: string) => Promise<void>;
  registerUser: (
    email: string,
    regFname: string,
    regLname: string,
    username: string,
    password: string,
    password2: string,
    profile: Profile,
    showAlert: (title: string, icon: "success" | "error", text?: string) => void, 
    navigate: (path: string) => void
  ) => Promise<void>;
  refreshToken: () => Promise<void>;
  profileImage: string | null; 
  handleAccountClosure: () => Promise<void>;
}

export interface Profile {
  age_bracket?: string;
  bio?: string;
  profile_image?: string | null;


}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface CustomJwtPayload extends JwtPayload {
  id?: number;
  username: string;
  email: string;
  bio?: string; // Optional if not always provided
  full_name?: string; // Optional for additional clarity
  first_name: string;
  last_name: string;
  profile?: Profile; // Optional if profile might not always be present
  profile_image?:string;
}
// export interface CustomJwtPayload extends JwtPayload {
//   user?: { // Nest the user object if the response has this structure
//     id?: number;
//     username: string;
//     email: string;
//     bio?: string;
//     full_name?: string;
//     first_name: string;
//     last_name: string;
//     profile?: Profile;
//     profile_image?: string;
//   };
//   access?: string;
//   refresh?: string;
// }


export interface ProfileUpdatePayload {
  username?: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  profile?: {
    age_bracket?: string;
    bio?: string;
  };
  current_password?: string;
  new_password?: string;
}