import { useState, useContext, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SideSettings from './SideSettings';
import AuthContext from '../../context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useFetchWithLoading } from '../../hooks/useFetchWithLoading';

const AccountSettings = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { user, fetchProfileData, updateProfile, refreshToken } = authContext;

  // State to store form data
  const [formData, setFormData] = useState({
    full_name: '',
    first_name: '',
    last_name: '',
    currentPassword: '',
    newPassword: ''
  });


  const loading = useFetchWithLoading(fetchProfileData);
  useEffect(() => {
    // Update form data only when the `user` data is available and loading is false
    if (user && !loading) {
      console.log('User data:', JSON.stringify(user)); // Check if user data is correct
      setFormData({
        full_name: user.full_name || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        currentPassword: '',
        newPassword: ''
      });
    }
  }, [user, loading]); // Ensure to include `user` as a dependency

  
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Save changes handler (to send updated data to the server)
  const handleSaveChanges = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      ...(formData.currentPassword && { currentPassword: formData.currentPassword }),
      ...(formData.newPassword && { newPassword: formData.newPassword })
    };
    
    console.log('Updating profile with payload:', payload); // Log payload
  
    try {
      await updateProfile(payload);
      console.log('Profile updated successfully');
      refreshToken(); // Refresh the token after successful update
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };
  

 

  
  return (
    <div className="flex w-full h-screen">
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
                    <span className="text-xl font-medium">Account Setting</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      Manage your personal information and update your password.
                    </p>
                    <Divider className="pt-4" />
                    <div className="relative flex flex-col gap-3">
                      {loading ? (
                        <>
                          <div className="flex flex-col justify-between gap-5 sm:flex-row">
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Skeleton width="w-1/4" height="h-6" className="mb-1" />
                              <Skeleton width="w-full" height="h-10" className="mb-1" />
                            </div>
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Skeleton width="w-1/4" height="h-6" className="mb-1" />
                              <Skeleton width="w-full" height="h-10" className="mb-2" />
                            </div>
                          </div>
                          <Skeleton width="w-1/6" height="h-10" className="mb-1" />
                        </>
                      ) : (
                        <form className="flex flex-col gap-3" onSubmit={handleSaveChanges}>
                          <div className="flex flex-col justify-between gap-5 sm:flex-row">
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Label htmlFor="first_name" className="font-medium text-medium">
                                First Name
                              </Label>
                              <Input
                                type="text"
                                id="first_name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                autoComplete="first_name"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Label htmlFor="last_name" className="font-medium text-medium">
                                Last Name
                              </Label>
                              <Input
                                type="text"
                                id="last_name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                autoComplete="last_name"
                              />
                            </div>
                          </div>

                          {/* Additional fields for password */}
                          <div className="flex flex-col justify-between gap-5 sm:flex-row">
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Label htmlFor="currentPassword" className="font-medium text-medium">
                                Current Password
                              </Label>
                              <Input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Current Password"
                                autoComplete="current-password"
                              />
                            </div>
                            <div className="flex flex-col w-full gap-3 pt-4">
                              <Label htmlFor="newPassword" className="font-medium text-medium">
                                New Password
                              </Label>
                              <Input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                autoComplete="new-password"
                              />
                            </div>
                          </div>

                          <div className="pt-4">
                            <Button type="submit">Save Changes</Button>
                          </div>
                        </form>
                      )}
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

export default AccountSettings;
