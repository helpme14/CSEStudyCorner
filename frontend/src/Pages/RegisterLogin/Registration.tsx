import React, { useState } from 'react';
import DynamicBackground from "../Bacground";
import Nav from "../Header";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from "@/components/ui/checkbox"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link } from 'react-router-dom';

const Registration = () => {
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <section className='h-screen'>
      <Nav />
      <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />
      <Box sx={{ width: '100%', typography: 'body1' }} className="flex flex-col items-center justify-center z-50" >
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex justify-center">
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{ width: '100%', maxWidth: 'md' }}>
              <Tab label="Log In" value="1" />
              <Tab label="Register" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" className='w-full'>
            <div className='w-full flex justify-center items-center'>
            <Card className='sm:w-1/2 lg:w-1/3 xl:w-1/4 md:w-1/3 w-full flex flex-col items-center'>
              <CardHeader className='text-center'>
                <CardTitle>Welcome back!</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
              </CardHeader>
              <CardContent className='w-full'>
                <div className="grid w-full gap-4">
                  <div className="grid items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter your Email" className='z-50' />
                  </div>
                  <div className="grid items-center gap-1.5 mt-1">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Enter your Password" className='z-50' />
                  </div>
                  <div>
                    <Link to="/forgot-password">
                      <a className='underline mt-1 z-50 text-sm text-blue-500'>Forgot your password?</a>
                    </Link>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='w-full'>
                <Button className='w-full bg-[#4F46E5] text-white'>Login</Button>
              </CardFooter>
            </Card>
            </div>
          </TabPanel>
          <TabPanel value="2" className='w-full flex justify-center items-center mt-0'>
            <Card className='sm:w-1/2 lg:w-1/3 xl:w-1/4 md:w-1/3 w-full flex flex-col items-center'>
              <CardHeader className='text-center'>
                <CardTitle>Register</CardTitle>
                <CardDescription>Create an account by filling in the details below.</CardDescription>
              </CardHeader>
              <CardContent className='w-full'>
                <div className="grid w-full gap-4">
                  <div className="grid items-center gap-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" placeholder="Enter your Username"  className='z-50'/>
                  </div>
                  <div className="grid items-center gap-1.5 mt-1">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" placeholder="Enter your Email"  className='z-50'/>
                  </div>
                  <div className="grid items-center gap-1.5 mt-1 w-full">
                    <Label htmlFor="age">Age Bracket</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Age" className='z-50' />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                          <SelectItem value="1">18-20 years old</SelectItem>
                          <SelectItem value="2">21-30 years old</SelectItem>
                          <SelectItem value="3">30-40 years old</SelectItem>
                          <SelectItem value="4">above 40 years old</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  <div className="grid items-center gap-1.5 mt-1">
                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" placeholder="Enter your Password" />
                  </div>
                  <div className="grid items-center gap-1.5 mt-1">
                    <Label htmlFor="cpassword">Confirm Password</Label>
                    <Input type="password" id="cpassword" placeholder="Confirm your Password" />
                  </div>
                  <div className=" flex space-x-2">
                      <Checkbox id="terms1" className='rounded-sm'/>
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="terms1"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-[2px]"
                        >
                          Accept terms and conditions
                        </label>
                      </div>
                    </div>
                </div>
              </CardContent>
              <CardFooter className='w-full'>
                <Button className='w-full bg-[#4F46E5] text-white'>Register</Button>
              </CardFooter>
            </Card>
          </TabPanel>
        </TabContext>
      </Box>
    </section>
  );
};

export default Registration;
