import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SideSettings from "./SideSettings";
import { Divider} from "@mui/material";
import { useState } from "react";
import { CameraAlt } from "@mui/icons-material";
import { Button } from "@/components/ui/button";


const ProfilePicture = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (selectedImage) {
      // Handle the image upload logic here (e.g., send it to the server)
      console.log('Uploading image:', selectedImage);
    }
  };

  return (
    <div className="w-full flex sm:h-screen h-full">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20">
            <Box sx={{ flexGrow: 1 }}>
              <div className="flex flex-col gap-2 pb-6">
                <span className="font-bold text-3xl">Settings</span>
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
                    <span className="text-xl font-medium">Profile Picture</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Update your profile picture to personalize your account. This image will be visible across your account and help others recognize you. Ensure the picture is clear and appropriate for all users.
                    </p>
                    <Divider className="pt-4" />

                    <div className="py-4 relative flex items-center justify-center flex-col sm:block sm:items-start sm:justify-start">
                        <div className="relative w-32 h-32 md:w-30 md:h-30 lg:w-30 lg:h-30 mb-4">
                        {imagePreview ? (
                            <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="w-32 h-32 rounded-full object-cover mb-4"
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                            <span className="text-gray-500 text-5xl font-semibold">AG</span>
                            </div>
                        )}
                        <label className="absolute bottom-0 right-0 p-2 bg-gray-400 rounded-full cursor-pointer shadow-lg hover:bg-gray-500 transition-all">
                          <CameraAlt className="text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        </div>

                      {/* Upload Button */}
                      <Button onClick={handleUpload}>Update Photo</Button>
                    </div>
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

export default ProfilePicture;
