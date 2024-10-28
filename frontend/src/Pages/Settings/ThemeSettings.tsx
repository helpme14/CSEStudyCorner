

import Navbar from "../Navbar"
import Sidebar from "../Sidebar"


import Grid from '@mui/material/Grid';
import SideSettings from "./SideSettings";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Divider } from "@mui/material";
import Box from '@mui/material/Box';



const Settings = () => {
  return (
    <div className="w-full flex sm:h-screen h-full ">
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
                                <span className="text-xl font-medium">Theme Preferences</span>
                                <p className="text-sm text-gray-500 dark:text-white">Choose between light, dark, or system themes to personalize the look and feel of your interface.</p>
                                <Divider className="pt-4" />
                                <ModeToggle />
                            </div>
                        </Grid>
                    </Grid>
                    </Box>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Settings