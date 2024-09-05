import React, { useState, useContext } from 'react';
import DynamicBackground from "../Bacground";
import Nav from "../Header";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Registration = () => {
  const [value, setValue] = useState('1');
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('AuthContext must be used within an AuthProvider');
  }

  const { registerUser, loginUser } = authContext;

  // State for login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for registration form
  const [regFname, setFname] = useState('');
  const [regLname, setLname] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [ageBracket, setAgeBracket] = useState('');
  const [ageBracketError, setAgeBracketError] = useState('');
  
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await loginUser(loginEmail.toLowerCase(), loginPassword);
      // Handle successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegistration = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!ageBracket) {
      setAgeBracketError("Please select your age bracket");
      return;
    }
    if (!regFname || !regLname || !regUsername || !regEmail || !regPassword || !regConfirmPassword) {
      swal.fire({
        title: "All fields are required",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
      });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(regEmail)) {
      swal.fire({
        title: "Invalid email format",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
      });
      return;
    }

    if (regPassword.length < 8) {
      swal.fire({
        title: "Password must be at least 8 characters",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
      });
      return;
    }

    if (regPassword !== regConfirmPassword) {
      swal.fire({
        title: "Passwords do not match",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        showConfirmButton: false,
      });
      return;
    }

    try {
      await registerUser(
        regEmail.toLowerCase(),
        regFname,
        regLname,
        regUsername,
        regPassword,
        regConfirmPassword,
        { age_bracket: ageBracket }
      );
      setValue("1"); // Switch to login tab
    } catch (error) {
      console.error("Registration failed:", error);
    }

    setRegEmail('');
    setFname('');
    setLname('');
    setRegUsername('');
    setRegPassword('');
    setRegConfirmPassword('');
    setAgeBracket('');
  };

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section className="h-screen">
      <Nav />
      <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />
      <Box sx={{ width: '100%', typography: 'body1' }} className="flex flex-col items-center justify-center mt-[6rem] z-20">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex justify-center">
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: "100%", maxWidth: "md" }}>
              <Tab label="Log In" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>

          {/* Login Tab */}
          <TabPanel value="1" className="w-full">
            <div className="flex items-center justify-center w-full">
              <Card className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 md:w-1/2">
                <form onSubmit={handleLogin} className="w-full">
                  <CardHeader className="text-center">
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your email and password to log in.</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full">
                    <div className="grid w-full gap-4">
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          type="email"
                          id="email"
                          placeholder="Enter your Email"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          type="password"
                          id="password"
                          placeholder="Enter your Password"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          autoComplete="current-password"
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="w-full">
                    <Button className="w-full bg-[#4F46E5] text-white" type="submit">Login</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </TabPanel>

          {/* Register Tab */}
          <TabPanel value="2" className="w-full">
            <div className="flex items-center justify-center w-full">
              <Card className="flex flex-col items-center w-full sm:w-1/2 lg:w-1/3 xl:w-1/3 md:w-1/2">
                <form onSubmit={handleRegistration} className="w-full">
                  <CardHeader className="text-center">
                    <CardTitle>Register</CardTitle>
                    <CardDescription>Fill out the form to create an account.</CardDescription>
                  </CardHeader>
                  <CardContent className="w-full">
                    <div className="grid w-full gap-4">
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-firstname">First Name</Label>
                        <Input
                          type="text"
                          id="reg-firstname"
                          placeholder="Enter your First Name"
                          value={regFname}
                          onChange={(e) => setFname(e.target.value)}
                          autoComplete="given-name"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-lastname">Last Name</Label>
                        <Input
                          type="text"
                          id="reg-lastname"
                          placeholder="Enter your Last Name"
                          value={regLname}
                          onChange={(e) => setLname(e.target.value)}
                          autoComplete="family-name"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-username">Username</Label>
                        <Input
                          type="text"
                          id="reg-username"
                          placeholder="Enter your Username"
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value)}
                          autoComplete="username"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-email">Email</Label>
                        <Input
                          type="email"
                          id="reg-email"
                          placeholder="Enter your Email"
                          value={regEmail}
                          onChange={(e) => setRegEmail(e.target.value)}
                          autoComplete="email"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-password">Password</Label>
                        <Input
                          type="password"
                          id="reg-password"
                          placeholder="Enter your Password"
                          value={regPassword}
                          onChange={(e) => setRegPassword(e.target.value)}
                          autoComplete="new-password"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="reg-confirm-password">Confirm Password</Label>
                        <Input
                          type="password"
                          id="reg-confirm-password"
                          placeholder="Confirm your Password"
                          value={regConfirmPassword}
                          onChange={(e) => setRegConfirmPassword(e.target.value)}
                          autoComplete="new-password"
                          required
                        />
                      </div>
                      <div className="grid items-center gap-1.5">
                        <Label htmlFor="age-bracket">Age Bracket</Label>
                        <Select onValueChange={(value) => setAgeBracket(value)} required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your age bracket" />
                          </SelectTrigger>
                          <SelectContent >
                          <SelectItem value="U18">18yrs old and below</SelectItem>
                            <SelectItem value="18-24">18-24</SelectItem>
                            <SelectItem value="25-30">25-30</SelectItem>
                            <SelectItem value="31-40">31-40</SelectItem>
                            <SelectItem value="41+">41+</SelectItem>
                          </SelectContent>
                        </Select>
                       
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="w-full">
                    <Button className="w-full bg-[#4F46E5] text-white" type="submit">Register</Button>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </section>
  );
};

export default Registration;
