
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Box from '@mui/material/Box';


import Grid from '@mui/material/Grid';
import SideSettings from "./SideSettings";

import {  Divider } from "@mui/material";
import { Button } from "@/components/ui/button";



const CloseAccount = () => {
  return (
        <div className="w-full flex h-screen ">
                <Sidebar />
                <div className="flex flex-col w-full">
                    <Navbar />
                    <section>
                        <div className="container py-20 ">
                        <Box sx={{ flexGrow: 1 }}>
                            <div className="flex flex-col gap-2 pb-6">
                                <span className="font-bold text-3xl">Settings</span>
                                <p className="text-base text-gray-500 dark:text-white">Manage your account settings and set e-mail preferences.</p>
                            </div>
                            <Divider />
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}  md={3} className="!pl-0" >
                                    <SideSettings />
                                </Grid>
                                
                                <Grid item xs={12} sm={12} md={9}>
                                <div className="flex flex-col gap-2 py-4">
                                        <span className="text-xl font-medium">Account Closure</span>
                                        <p className="text-sm text-gray-500 dark:text-white">To close your account, please confirm below. Note that this action will permanently delete all your data.</p>
                                        <Divider className="pt-4" />
                                    </div>
                                        <Button variant="destructive">Close Account</Button>
                                </Grid>
                            </Grid>
                            </Box>
                        </div>
                    </section>
                </div>
            </div>
  )
}

export default CloseAccount
