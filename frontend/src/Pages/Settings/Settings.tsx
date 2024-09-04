

import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import Box from '@mui/material/Box';


import Grid from '@mui/material/Grid';
import SideSettings from "./SideSettings";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Settings = () => {
  return (
    <div className="w-full flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
            <Navbar />
            <section>
                <div className="container mx-auto py-20">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}  md={3} >
                            <SideSettings />
                        </Grid>
                        <Grid item xs={12} sm={12} md={9}>
                            <div className="flex flex-col gap-4 pt-10 px-10">
                                <span className="text-2xl font-semibold">Account Settings</span>
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