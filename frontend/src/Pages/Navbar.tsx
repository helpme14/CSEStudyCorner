import React, { useState } from 'react';
import Secondlogo from '../assets/Light-corner.png';
import darkSecondlogo from '../assets/Dark-corner.png';
import { GoXCircle, GoSearch, GoMoon  } from "react-icons/go";
import { Link } from "react-router-dom";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { searches as searchData } from "./modules/searchData";
import { Card } from "@/components/ui/card";
import {categories, Categories, courses, Course } from "./modules/courseData";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface NavbarProps {
  className?: string;
}


const Navbar: React.FC <NavbarProps> = ({ className }) => {

  const [isFocused, setIsFocused] = useState(false)
  const [showDiv, setShowDiv] = useState(false);
  const [searches, setSearches] = useState(searchData);

  const handleFocus = () => {
    setIsFocused(true);
    setTimeout(() => {
      setShowDiv(true);
    }, 300);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setShowDiv(false);
  };

  const handleDelete = (id: number) => {
    setSearches((prevSearches) => prevSearches.filter((search) => search.id !== id));
  };
  
  return (
    <nav className={`sticky top-0 block z-20 w-full h-15 ${className} `}>
      <div className=" px-8 py-2 w-full  bg-white shadow dark:bg-gray-800">
        <div className="flex items-center justify-between w-full">
          <a href="#">
            <img className="w-28 sm:w-36 h-8 sm:h-10 dark:hidden" src={Secondlogo} alt="Logo" />
            <img className="w-28 sm:w-36 h-8 sm:h-10 dark:block hidden" src={darkSecondlogo} alt="Logo" />
          </a>
          <form className='relative'>
            {showDiv && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-20"
                onClick={handleBlur}
              ></div>
            )}

            <div className={` ${isFocused ? ' z-50 relative sm:flex hidden items-center' : 'relative sm:flex hidden items-center'
                  }` }>
              <GoSearch  className="absolute left-3 text-gray-500 cursor-pointer" />
              <input
                type="text"
                className="px-10 py-2 text-gray-700  bg-gray-50 rounded-full dark dark:bg-gray-700 dark:text-gray-300 focus:outline-none border-2 dark:border-gray-500 transition-all duration-300 ease-in-out w-[30vw] focus:w-[50vw] ${isFocused ? 'z-50 border-gray-400' : 'border-gray-500'"
                placeholder="Search courses"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
                {isFocused && (
                  <GoXCircle className="absolute right-4 text-gray-500 cursor-pointer"  />
                )}
            </div>

            {showDiv && (
              <div
                className={`absolute top-7 p-6 z-40  bg-white shadow-lg text-gray-700 w-[49.7vw] rounded-b-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 transition-opacity duration-300 ease-in-out dark:bg-gray-900 dark:text-gray-300 ${isFocused ? 'opacity-100 visible z-40' : 'opacity-0 invisible'
                  }`}
              >
                <div className='flex flex-col font-sans mt-5 items-between justify-center gap-5'>
                  <div>
                    <span className='font-semibold'>Recent searches</span>
                      <div className='mt-2'>
                      <Stack direction="row" spacing={2}>
                        {searches.map((search) => (
                          <Chip
                            key={search.id}
                            label={search.title}
                            className='dark:text-white dark:bg-dark-200'
                            onDelete={() => handleDelete(search.id)}
                          />
                        ))}
                      </Stack>
                      </div>
                  </div>
                  <div>
                    <span className='font-semibold'>Recommended for you</span>
                      <div className='mt-2'>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {categories.map((category: Categories) => (
                                <Card key={category.id} className="p-3 relative dark:bg-[#1F2937]"  data-aos-anchor-placement="top-bottom">
                                    <div className="flex gap-5">
                                        <img
                                            src={category.imageUrl}
                                            alt={category.title}
                                            className="h-14 object-cover w-14 rounded-md"
                                        />
                                        <div className="col-span-2 flex flex-col">
                                            <h3 className="text-base font-semibold">{category.title}</h3>
                                            <p className="text-sm text-gray-600">{category.total_course} Courses</p>
                                        </div>
                                    </div>
                            
                                </Card>
                            ))}
                        </div>
                      </div>
                  </div>
                  <div>
                    <span className='font-semibold'>Popular on CSE Study Corner</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
                      {courses.slice(0, 3).map((course: Course) => (
                          <Card key={course.id} className=" bg-white border rounded-lg hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer dark:bg-[#1F2937]">
                              <div className="flex flex-col">
                                  <div className="relative">
                                      <img
                                          src={course.imageUrl}
                                          alt={course.title}
                                          className="w-full h-32 object-cover rounded-lg"
                                      />
                                  </div>
                                  <div className="flex flex-col gap-1 p-4">
                                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{course.title}</h3>
                                      <p className="text-sm text-gray-600">{course.description}</p>
                                  </div>
                              </div>
                          </Card>
                      ))}
                  </div>
                  </div>
                </div>
              </div>
            )}
          </form>
          <div className="flex items-center">
            {/* Notifications */}
            <button
              className="mx-4 text-gray-600 transition-colors duration-300 transform dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
              aria-label="show notifications"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild >
                <button type="button" className="flex items-center focus:outline-none" aria-label="toggle profile dropdown">
                  <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mr-10"  >
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link  to="/theme">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  <DropdownMenuItem>
                    <Keyboard className="mr-2 h-4 w-4" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <Link to="/theme">
                  <DropdownMenuItem>
                    <GoMoon className="mr-2 h-4 w-4" />
                    <span>Dark Mode</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem disabled>
                  <Cloud className="mr-2 h-4 w-4" />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
