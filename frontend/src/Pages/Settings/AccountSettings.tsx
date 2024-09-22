import { useState } from 'react';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SideSettings from './SideSettings';

const AccountSettings = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  return (
    <div className="w-full flex sm:h-screen h-full">
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
                    <Grid item xs={12} sm={12}  md={3} className="!pl-0" >
                        <SideSettings />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                        <div className="flex flex-col gap-2 py-4">
                            <span className="text-xl font-medium">Pccount Setting</span>
                            <p className="text-sm text-gray-500 dark:text-white">
                            Manage your personal information and update your password.
                            </p>
                            <Divider className="pt-4" />

                            <form className="flex flex-col gap-3">
                                <div className='flex justify-between flex-col sm:flex-row  gap-5'>
                                    <div className="pt-4 flex flex-col gap-3 w-full">
                                        <Label htmlFor="firstName" className="font-medium text-medium">
                                        First Name
                                        </Label>
                                        <Input
                                        type="text"
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        />
                                    </div>
                                    <div className="pt-4 flex flex-col gap-3 w-full">
                                        <Label htmlFor="lastName" className="font-medium text-medium">
                                        Last Name
                                        </Label>
                                        <Input
                                        type="text"
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        />
                                    </div>
                                </div>
                                <div className='flex justify-between flex-col sm:flex-row gap-5'>
                                    <div className="pt-4 flex flex-col gap-3 w-full">
                                        <Label htmlFor="currentPassword" className="font-medium text-medium">
                                        Current Password
                                        </Label>
                                        <Input
                                        type="password"
                                        id="currentPassword"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Current Password"
                                        />
                                    </div>
                                    <div className="pt-4 flex flex-col gap-3 w-full">
                                        <Label htmlFor="newPassword" className="font-medium text-medium">
                                        New Password
                                        </Label>
                                        <Input
                                        type="password"
                                        id="newPassword"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="New Password"
                                        />
                                    </div>
                                </div>
                            <div className="pt-4">
                                <Button>Save Changes</Button>
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

export default AccountSettings;
