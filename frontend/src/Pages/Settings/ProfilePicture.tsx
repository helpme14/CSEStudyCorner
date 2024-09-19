import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SideSettings from './SideSettings';
import {Divider} from '@mui/material';
import React, {useState, useContext, useEffect} from 'react';
import {CameraAlt} from '@mui/icons-material';
import {Button} from '@/components/ui/button';
import AuthContext from '../../context/AuthContext';
import {createClient} from '@supabase/supabase-js';
import swal from 'sweetalert2';
import {Skeleton} from '@/components/ui/skeleton';
import {useFetchWithLoading} from '../../hooks/useFetchWithLoading';

const ProfilePicture = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
  const supabase = createClient(supabaseUrl, supabaseKey);
  const bucketName = import.meta.env.VITE_SUPABASE_DIR; // bucket dir

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const {user, fetchProfileData, updateProfilePicture, authTokens} =
    authContext;
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [initials, setInitials] = useState<string>(''); // Store initials for fallback
  const loading = useFetchWithLoading(fetchProfileData);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  });

  const username = formData.first_name + ' ' + formData.last_name;

  if (!authTokens) {
    throw new Error('authTokens is null');
  }

  const showAlert = (
    title: string,
    icon: 'success' | 'error',
    text?: string
  ) => {
    swal.fire({
      title,
      icon,
      text,
      toast: true,
      timer: 3000,
      position: 'top-right',
      timerProgressBar: true,
      showConfirmButton: false
    });
  };

  // Set initials based on the username
  useEffect(() => {
    if (user) {
      setInitials(getInitials(username || 'Guest User'));
    }
  }, [user, username]);

  useEffect(() => {
    // Update form data only when the `user` data is available and loading is false
    if (user && !loading) {
      console.log('User data:', JSON.stringify(user)); // Check if user data is correct

      setFormData({
        first_name: user.first_name || '',
        last_name: user.last_name || ''
      });
    }
  }, [user, loading]);

  // Set profile image if available in user data
  useEffect(() => {
    if (user?.profile?.profile_image) {
      setProfileImage(user?.profile?.profile_image);
    }
  }, [user]);

  // Imahe change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); // Update local preview
      setSelectedFile(file); // Store the selected file

      console.log('imageURL LOCAL : ' + imageUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const filePath = `${user?.email || 'unknown_user'}/${selectedFile.name}`;
    try {
      const {error: uploadError} = await supabase.storage
        .from(bucketName)
        .upload(filePath, selectedFile);

      if (uploadError) {
        console.error('Upload Error:', uploadError.message);
        showAlert('Upload Failed', 'error', uploadError.message);
        return;
      }

      const {data} = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (!data?.publicUrl) {
        console.error('Error getting public URL');
        showAlert('URL Error', 'error', 'Failed to get public URL');
        return;
      }

      const publicURL = data.publicUrl;
      setProfileImage(publicURL);

      // Send the public URL to Django
      const response = await updateProfilePicture(publicURL);
      console.log('Profile picture updated successfully' + response);

      fetchProfileData();
    } catch (error) {
      console.error('Error uploading image:', error);
      showAlert(
        'Upload Failed',
        'error',
        'An unexpected error occurred. Please try again.'
      );
    }
  };

  // Image loading logic
  useEffect(() => {
    if (profileImage) {
      const img = new Image();
      img.src = profileImage;
      img.onload = () => setImageReady(true);
      img.onerror = () => setImageReady(true); // Fallback to initials on error
    } else {
      setImageReady(true); // No image, show initials
    }
  }, [profileImage]);

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    const initials = nameParts
      .map((part) => part.charAt(0))
      .join('')
      .toUpperCase();
    return initials;
  };

  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20">
            <Box sx={{flexGrow: 1}}>
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
                    <span className="text-xl font-medium">Profile Picture</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Update your profile picture to personalize your account.
                      This image will be visible across your account and help
                      others recognize you. Ensure the picture is clear and
                      appropriate for all users.
                    </p>
                    <Divider className="pt-4" />

                    <div className="flex flex-col items-start">
                      {/* Profile Image or Initials */}
                      <div className="relative w-24 h-24">
                        <div className="w-full h-full overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-500">
                          {loading || !imageReady ? (
                            <Skeleton className="w-full h-full rounded-full" />
                          ) : profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile Preview"
                              className="object-cover w-full h-full"
                              onError={() => setProfileImage(null)} // Fallback to initials if image fails
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 dark:bg-gray-700">
                              <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                                {initials}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Camera Icon for Upload - Positioned at bottom-right */}
                        <label className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 p-1 bg-gray-700 rounded-full shadow-lg cursor-pointer hover:bg-gray-500">
                          <CameraAlt className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageChange(e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      {/* Button Aligned Below the Picture */}
                      <div>
                        <Button className="mt-3" onClick={handleUpload}>
                          Update Photo
                        </Button>
                      </div>
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
