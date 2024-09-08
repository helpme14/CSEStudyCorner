import logo from '../assets/cap-logo.png';
import DarkLogo from '../assets/cap-logo-light.png'
import { useState } from "react";

import { GoHome, GoGlobe, GoRepo, GoBookmark, GoGear, GoInfo, GoSearch } from "react-icons/go";
import { Dialog, DialogContent, DialogTrigger, DialogOverlay } from "@/components/ui/dialog";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
interface SidebarProps {
  className?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Sidebar */}
      <aside
        className={`sm:hidden md:hidden lg:hidden xl:flex top-0 left-0  hidden flex-col items-center w-[4.5rem] h-full py-8 overflow-y-auto bg-[#f5f5f5] border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700`}
      >

        <nav className="fixed flex flex-col items-center flex-1 space-y-3">
          <a href="#">
            <img className="w-10 h-10 mb-3 dark:hidden" src={logo} alt="Logo" />
            <img className="hidden w-10 h-10 mb-3 dark:block" src={DarkLogo} alt="Dark Mode Logo" />
          </a>

          {/* Navigation Items */}
          <Link to="/home" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col items-center gap-1'>
              <GoHome className='w-6 h-6' />
              <span className=' font-medium text-[0.8rem] '>Home</span>
            </div>
          </Link>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
          <div className='flex flex-col items-center gap-1'>
              <GoGlobe className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Explore</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col items-center gap-1'>
                <GoRepo className='w-5 h-5' />
                <span className=' font-medium text-[0.8rem]'>Courses</span>
              </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col items-center gap-1'>
              <GoBookmark className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Saved</span>
            </div>
          </a>

          <Link to="/theme" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500  dark:hover:text-blue-300">
            <div className='flex flex-col items-center gap-1'>
              <GoGear className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Settings</span>
            </div>
          </Link>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col items-center gap-1'>
              <GoInfo className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Help</span>
            </div>
          </a>
        </nav>


      </aside>


    
      <nav className="fixed bottom-0 left-0 z-20 flex justify-around w-full p-4 bg-white border-t sm:flex md:flex lg:flex xl:hidden rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
        <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <GoHome className="w-5 h-6" />
        </a>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <a
                href="#"
                className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100"
              >
                <GoSearch className="w-5 h-5" />
              </a>
            </DialogTrigger>


            <DialogOverlay className="fixed inset-0 transition-opacity duration-300 bg-black/50" />
            <DialogContent
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md dark:bg-gray-800 transition-transform duration-300 !p-0"
              style={{ transitionTimingFunction: "ease-in-out" }}
            >
              <Command className="rounded-lg border shadow-md md:min-w-[450px]">
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Smile className="w-4 h-4 mr-2" />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem disabled>
                      <Calculator className="w-4 h-4 mr-2" />
                      <span>Calculator</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User className="w-4 h-4 mr-2" />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCard className="w-4 h-4 mr-2" />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="w-4 h-4 mr-2" />
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
                {/* 
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                  Close
                </Button>
              </div>*/}
            </DialogContent>
          </Dialog>
        
        <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <GoRepo className="w-5 h-5" />
        </a>
    
        <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <GoBookmark className="w-5 h-5" />
        </a>
      </nav>

    </div>
  );
};

export default Sidebar;
