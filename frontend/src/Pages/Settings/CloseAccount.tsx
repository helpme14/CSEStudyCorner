
import Navbar from "../Navbar"
import Sidebar from "../Sidebar"
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogOverlay } from "@/components/ui/dialog";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SideSettings from "./SideSettings";

import {  Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import { GoTrash } from "react-icons/go";



const CloseAccount = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                        {/* Button to trigger the modal */}
                                        <DialogTrigger asChild>
                                            <Button variant="destructive">
                                            <GoTrash className="mr-2 text-base" />
                                            Close Account
                                            </Button>
                                        </DialogTrigger>

                                        <DialogOverlay className="fixed inset-0 bg-black/50 transition-opacity duration-300" />

                                        <DialogContent
                                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-transform duration-300"
                                            style={{ transitionTimingFunction: "ease-in-out" }}
                                        >
                                            <h2 className="text-xl font-semibold">Close Account</h2>
                                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                                            Are you sure you want to close your account? This action cannot be undone.
                                            </p>

                                            <div className="mt-6 flex justify-end gap-2">
                                            <Button variant="secondary" onClick={() => setIsOpen(false)}>
                                                Cancel
                                            </Button>
                                            <Button variant="destructive" onClick={() => handleAccountClosure()}>
                                                Confirm
                                            </Button>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </Grid>
                            </Grid>
                            </Box>
                        </div>
                    </section>
                </div>
            </div>
  )
};

const handleAccountClosure = () => {

    console.log("Account closed");
  };
  

export default CloseAccount
