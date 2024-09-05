import react, { useContext, useState } from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SideSettings from "./SideSettings";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AuthContext from "../../context/AuthContext";

const PublicProfile = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;

  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }
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
                    <span className="text-xl font-medium">Profile</span>
                    <p className="text-sm text-gray-500 dark:text-white">
                      This is how others will see you on the site.
                    </p>
                    <Divider className="pt-4" />
                    <form className="flex flex-col gap-3">
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="username"
                          className="font-medium text-medium"
                        >
                          Username
                        </Label>
                        <Input
                          type="text"
                          id="Username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <p className="text-sm text-gray-500 dark:text-white">
                          This is your public display name. It can be your real
                          name or a pseudonym. You can only change this once
                          every 30 days.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="email"
                          className="font-medium text-medium"
                        >
                          Email
                        </Label>
                        <Input
                          type="email"
                          id="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <p className="text-sm text-gray-500 dark:text-white">
                          You can manage verified email addresses in your email
                          settings.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 pt-4">
                        <Label
                          htmlFor="bio"
                          className="font-medium text-medium"
                        >
                          Bio
                        </Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us a little bit about yourself"
                          value={formData.bio}
                          onChange={handleChange}
                        />
                        <p className="text-sm text-gray-500 dark:text-white">
                          You can @mention other users and organizations to link
                          to them.
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
