import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SideSettings from './SideSettings';
import { Divider } from '@mui/material';
import React, { useState, useContext, useEffect,useCallback } from 'react';
import { CameraAlt } from '@mui/icons-material';
import { Button } from '@/components/ui/button';
import AuthContext from '../../context/AuthProvider';
import { supabase } from '../../context/supabaseClient';
import swal from 'sweetalert2';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchWithLoading } from '../../hooks/useFetchWithLoading'
// import { Profile } from '../../context/types/AuthTypes'; //
import { fetchProfileData } from '../../context/actions/fetchProfileData'; 


const ProfilePicture = () => {
  const bucketName = import.meta.env.VITE_SUPABASE_DIR;

  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, updateProfilePicture, authTokens } = authContext;
  
  const fetchProfileDataCallback = useCallback(() => fetchProfileData(authTokens), [authTokens]);
  const { loading, error, data } = useFetchWithLoading(fetchProfileDataCallback);

  
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageReady, setImageReady] = useState(false);
  const [initials, setInitials] = useState<string>(''); 

 

  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: ''
  });

  const username = formData.first_name + ' ' + formData.last_name;

  const showAlert = (title: string, icon: 'success' | 'error', text?: string) => {
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

  useEffect(() => {
    if (data) {
      setInitials(getInitials(username || 'Guest User'));
    }
  }, [data, username]);

  useEffect(() => {
    if (data) {
      setFormData({
        first_name: data.first_name || '',
        last_name: data.last_name || ''
      });
    }
  }, [data]);

  useEffect(() => {
    if (data?.profile?.profile_image) {
      setProfileImage(data?.profile?.profile_image);
      console.log("null image??",  data?.profile?.profile_image)
      setImageReady(false); 
    } else {
      setProfileImage(null); 
      console.log("null image", data)
      setImageReady(true);  
    }
  }, [data]);

  useEffect(() => {
    if (profileImage) {
      const img = new Image();
      img.src = profileImage;
      img.onload = () => setImageReady(true); 
      img.onerror = () => setImageReady(false); 
    } else {
      setImageReady(false); 
    }
  }, [profileImage]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl); 
      setSelectedFile(file); 
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const userPath = `${data?.email || 'unknown_user'}`;

    try {
      const { data: files } = await supabase.storage
        .from('bucket')
        .list(`user_images/${user?.email}`);

      const filesToDelete = files?.map(file => `user_images/${userPath}/${file.name}`) || [];

      await supabase.storage.from('bucket').remove(filesToDelete);

      const filePath = `${userPath}/${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, selectedFile);

      if (uploadError) {
        showAlert('Upload Failed', 'error', uploadError.message);
        setIsUploading(false);
        return;
      }

      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

      if (!data?.publicUrl) {
        showAlert('URL Error', 'error', 'Failed to get public URL');
        setIsUploading(false);
        return;
      }

      const publicURL = data.publicUrl;
      setProfileImage(publicURL);

      await updateProfilePicture(publicURL);
      fetchProfileData(authTokens);
      setIsUploading(false);
    } catch (error) {
      showAlert('Upload Failed', 'error', 'An unexpected error occurred. Please try again.');
      setIsUploading(false);
    }
  };

  const getInitials = (name: string) => {
    const nameParts = name.split(' ');
    return nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="flex w-full h-full sm:h-screen">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Navbar />
        <section>
          <div className="container py-20">
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
                    <span className="text-xl font-medium">Profile Picture</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Update your profile picture to personalize your account.
                    </p>
                    <Divider className="pt-4" />

                    <div className="flex flex-col items-start">
                      <div className="relative w-24 h-24">
                        <div className="w-full h-full overflow-hidden border-2 border-gray-300 rounded-full dark:border-gray-500">
                          {loading || !imageReady || isUploading ? (
                            <Skeleton className="w-full h-full rounded-full" />
                          ) : profileImage ? (
                            <img
                              src={profileImage}
                              alt="Profile Preview"
                              className="object-cover w-full h-full rounded-full" // Adjusted here
                              onError={() => {
                                setProfileImage(null);
                                setImageReady(false); // Set imageReady to false if there's an error
                              }}
                            />
                          ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full dark:bg-gray-700">
                              <span className="text-3xl font-bold text-gray-700 dark:text-gray-300">
                                {initials}
                              </span>
                            </div>
                          )}
                        </div>

                        <label className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 p-1 bg-gray-700 rounded-full shadow-lg cursor-pointer hover:bg-gray-500">
                          <CameraAlt className="w-5 h-5 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div>
                        <Button className="mt-3" onClick={handleUpload} disabled={isUploading}>
                          {isUploading ? 'Uploading...' : 'Update Photo'}
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
