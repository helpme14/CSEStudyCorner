import { useState } from 'react';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import SideSettings from "./SideSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FiUpload } from 'react-icons/fi'; // Importing upload icon from react-icons

const PublicProfile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [username, setUsername] = useState<string>('Alice Green'); // For demonstration, prefilled username

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
    const nameParts = name.split(' ');
    const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
    return initials;
  };

  return (
    <div className="w-full flex h-full overflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
            <div className="container mx-auto py-20">
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
                        <span className="text-xl font-medium">Profile</span>
                        <p className="text-sm text-gray-500 dark:text-white">
                        This is how others will see you on the site.
                        </p>
                        <Divider className="pt-4" />


                        <div className="pt-4 flex flex-col gap-3">
                        <Label htmlFor="profilePicture" className="font-medium text-medium">
                            Profile Picture
                        </Label>
                        <div className="relative group w-24 h-24">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-500 flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                            {profileImage ? (
                                <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-2xl font-bold text-gray-700 dark:text-white">
                                {getInitials(username)}
                                </span>
                            )}
                            </div>

                            <label
                            htmlFor="profilePicture"
                            className="absolute inset-0 bg-gray-500 rounded-full bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            >
                            <FiUpload className="text-white text-2xl" />
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
                            Recommended size: 400x400px. Supported formats: .jpg, .png, .gif.
                        </p>
                        </div>


                        <form className="flex flex-col gap-3">
                        <div className="pt-4 flex flex-col gap-3">
                            <Label htmlFor="username" className="font-medium text-medium">
                            Username
                            </Label>
                            <Input
                            type="text"
                            id="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            />
                            <p className="text-sm text-gray-500 dark:text-white">
                            This is your public display name. You can only change this once every 30 days.
                            </p>
                        </div>
                        <div className="pt-4 flex flex-col gap-3">
                            <Label htmlFor="email" className="font-medium text-medium">
                            Email
                            </Label>
                            <Input type="email" id="email" placeholder="Email" />
                            <p className="text-sm text-gray-500 dark:text-white">
                            You can manage verified email addresses in your email settings.
                            </p>
                        </div>
                        <div className="pt-4 flex flex-col gap-3">
                            <Label htmlFor="bio" className="font-medium text-medium">
                            Bio
                            </Label>
                            <Textarea id="bio" placeholder="Tell us a little bit about yourself" />
                            <p className="text-sm text-gray-500 dark:text-white">
                            You can @mention other users and organizations to link to them.
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
