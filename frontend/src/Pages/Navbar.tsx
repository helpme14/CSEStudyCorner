import React,{useContext,useState} from 'react';
import Secondlogo from '../assets/Light-corner.png';
import darkSecondlogo from '../assets/Dark-corner.png';
import { FaSearch } from "react-icons/fa"; 
import { Link } from "react-router-dom";
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
  LifeBuoy,
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
import AuthContext from "../context/AuthContext";
interface NavbarProps {
  className?: string;
}


const Navbar: React.FC <NavbarProps> = ({ className }) => {
  const [isFocused, setIsFocused] = useState(false)
  const authContext = useContext(AuthContext)
  
  if (!authContext) {
      throw new Error('AuthContext must be used within an AuthProvider');
    }
  
  const {logoutUser} = authContext
  
  return (
    <nav className={`sticky top-0 z-50 block w-full h-15 ${className}`}>
      <div className="w-full px-8 py-2 bg-white shadow dark:bg-gray-800">
      <div className="flex items-center justify-between w-full">
          <a href="#">
            <img className="h-8 w-28 sm:w-36 sm:h-10 dark:hidden" src={Secondlogo} alt="Logo" />
            <img className="hidden h-8 w-28 sm:w-36 sm:h-10 dark:block" src={darkSecondlogo} alt="Logo" />
          </a>
  {/* Search */}
          <form className='relative'>
            <div className="relative items-center hidden sm:flex">
              <FaSearch className="absolute text-gray-500 cursor-pointer left-3" />
              <input
                type="text"
                className="pl-10 pr-4 py-2 text-gray-700 border border-w-2 bg-gray-50 rounded-full dark:bg-gray-700 dark:text-gray-300 focus:outline-none  transition-all duration-300 ease-in-out w-[30vw] focus:w-[50vw]"
                placeholder="Search courses"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              <FaSearch className="absolute text-gray-500 cursor-pointer right-4" />
            </div>

            {isFocused && (
        <div className={`absolute top-18 p-4 bg-white shadow-lg text-gray-700 w-[49vw] rounded-b-xl left-1/2 -translate-x-1/2 flex flex-col gap-2 transition-opacity duration-300 ease-in-out ${isFocused ? 'opacity-100 visible delay-10000' : 'opacity-0 invisible'}`}>
          <div>
          sdsds
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
                  <Avatar className='w-8 h-8'>
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
                    <User className="w-4 h-4 mr-2" />
                    <span>Profile</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="w-4 h-4 mr-2" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <Link  to="/home/profile">
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </Link>
                  <DropdownMenuItem>
                    <Keyboard className="w-4 h-4 mr-2" />
                    <span>Keyboard shortcuts</span>
                    <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="w-4 h-4 mr-2" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="w-4 h-4 mr-2" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="w-4 h-4 mr-2" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="w-4 h-4 mr-2" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus className="w-4 h-4 mr-2" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github className="w-4 h-4 mr-2" />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="w-4 h-4 mr-2" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud className="w-4 h-4 mr-2" />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logoutUser}>
                  <LogOut className="w-4 h-4 mr-2" />
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
