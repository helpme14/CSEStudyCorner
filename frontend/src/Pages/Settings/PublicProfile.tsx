import { useState, useContext, useEffect } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SideSettings from "./SideSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AuthContext from "../../context/AuthContext";
import { FiUpload } from "react-icons/fi"; // Importing upload icon from react-icons

const PublicProfile = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user, fetchProfileData, updateProfile } = authContext;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    profile: {
      age_bracket: user?.profile?.age_bracket  || "",
      bio: user?.profile?.bio || "",
    },
  });
  useEffect(() => {
    // When user data changes, update the formData state
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        profile: {
          age_bracket:  user?.profile?.age_bracket  || "",
          bio: user?.profile?.bio || "",
        },
      });
    }
  }, [user]);
  
  
  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    // If the field is inside the profile object
    if (name in formData.profile) {
      setFormData((prevState) => ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const username = formData.first_name + " " + formData.last_name;

  // Function to handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // Generate initials from the username
  const getInitials = (name: string) => {
    const nameParts = name.split(" ");
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join("")
      .toUpperCase();
    return initials;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form Data Submitted:", formData);
  
    // Prepare the profile data with optional fields
    const profileData = {
      ...(formData.profile.age_bracket && { age_bracket: formData.profile.age_bracket }), // Only include if not empty
      bio: formData.profile.bio, // Always include bio
    };
  
    // Call updateProfile from AuthContext
    try {
      await updateProfile({
        username: formData.username,
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        profile: profileData,
      });
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };

  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20 mx-auto">
            <Box sx={{ flexGrow: 1 }}>
              <div className="flex flex-col gap-2 pb-6">
                <span className="text-3xl font-bold">Settings</span>
                <p className="text-base text-gray-500 dark:text-white">
                  Manage your account settings and set e-mail preferences.
                </p>
              </div>
              <Divider />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3} className="!pl-0">
                  <SideSettings />
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                  <div className="flex flex-col gap-2 py-4">
                    <span className="text-xl font-medium">Profile</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      This is how others will see you on the site.
                    </p>
                    <Divider className="pt-4" />
                    <div className="flex flex-col gap-3 pt-4">
                      <Label
                        className="font-medium text-medium"
                      >
                        Profile Picture
                      </Label>
                      <div className="relative w-24 h-24 group">
                        <div className="flex items-center justify-center w-full h-full overflow-hidden text-gray-500 bg-gray-200 border-2 border-gray-300 rounded-full dark:border-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          {profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile"
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <span className="text-2xl font-bold text-gray-700 dark:text-white">
                              {getInitials(username)}
                            </span>
                          )}
                          
                        </div>

                        <label
                          htmlFor="profilePicture"
                          className="absolute inset-0 flex items-center justify-center transition-opacity bg-gray-500 bg-opacity-50 rounded-full opacity-0 cursor-pointer group-hover:opacity-100"
                        >
                          <FiUpload className="text-2xl text-white" />
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          id="profilePicture"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </div>
                      <p className="text-sm text-gray-500 dark:text-white">
                        Recommended size: 400x400px. Supported formats: .jpg,
                        .png, .gif.
                      </p>
                    </div>

                    <form
                      className="flex flex-col gap-3"
                      onSubmit={handleSubmit}
                    >
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="username"
                          className="font-medium text-medium"
                        >
                          Username
                        </Label>
                        <Input
                          type="text"
                          id="Username"
                          name="username"
                          placeholder="Username"
                          onChange={handleChange}
                          value={formData.username}
                        />
                        <p className="text-sm text-gray-500 dark:text-white">
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="email"
                          className="font-medium text-medium"
                        >
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                        <p className="text-sm text-gray-500 dark:text-white">
                          You can manage verified email addresses in your email
                          settings.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="bio"
                          className="font-medium text-medium"
                        >
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Tell us a little bit about yourself"
                          onChange={handleChange}
                          value={formData.profile.bio}
                        />
                      
                        <p className="text-sm text-gray-500 dark:text-white">
                          You can @mention other users and organizations to link
                          to them.
                        </p>
                      </div>
                      <div className="pt-4">
                        <Button>Update Profile</Button>
                      </div>
                    </form>
                  </div>
                </Grid>
              </Grid>
            </Box>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PublicProfile;
