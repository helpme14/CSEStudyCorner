import logo from '../assets/cap-logo.png';
import DarkLogo from '../assets/cap-logo-light.png'
import { GoHome, GoStack, GoRepo, GoBookmark, GoGear, GoInfo, GoSearch, GoPerson, GoChevronRight } from "react-icons/go";
import { explore } from './modules/exploreCategories';
import { Link } from 'react-router-dom';
import { useState } from 'react';
// import { Skeleton } from "@/components/ui/skeleton"

interface SidebarProps {
  className?: string;
  setIsSidebarFocused?: (focused: boolean) => void; 
}

const Sidebar: React.FC<SidebarProps> = ({ className, setIsSidebarFocused}) => {

  const [isHovered, setIsHovered ] = useState(false);

  return (
    <div 
    className={`relative ${className} ${isHovered ? "z-50" : "sm:z-10 z-50 xl:z-10 md:z-50"}`}
    onMouseEnter={() => {
      setIsHovered(true);
      setIsSidebarFocused?.(true);
    }}
    onMouseLeave={() => {
      setIsHovered(false);
      setIsSidebarFocused?.(false);
    }}
  >
      {/* Sidebar */}
      <aside
        className={`sm:hidden md:hidden lg:hidden xl:flex top-0 left-0  hidden flex-col items-center w-[4.5rem] h-full py-3 overflow-y-auto bg-[#f5f5f5] border-r rtl:border-l rtl:border-r-0 dark:bg-gray-800 dark:border-gray-700`}
      >
        <nav className="flex flex-col flex-1 space-y-3 items-center fixed">
          <a href="#">
            <img className="w-10 h-10 mb-3 dark:hidden" src={logo} alt="Logo" />
            <img className="w-10 h-10 mb-3 hidden dark:block" src={DarkLogo} alt="Dark Mode Logo" />
          </a>

          {/* Navigation Items */}
          <Link to="/home" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col gap-2 items-center'>
              <GoHome className='w-6 h-6' />
              <span className=' font-medium text-[0.8rem] '>Home</span>
            </div>
          </Link>
          
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300 relative group">
            <div className='flex flex-col gap-1 items-center'>
              <GoStack className='w-5 h-5' />
              <span className='font-medium text-[0.8rem]'>Explore</span>
            </div>

            {/* Hover Fullscreen Container */}
            <div className="absolute -top-40 left-full hidden group-hover:flex  bg-[#f5f5f5] dark:bg-gray-900 w-[14vw] h-[110vh] py-6 pl-6 pr-0 dark:border-gray-700"    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)} >
              <div className="">
                <h2 className="text-base text-gray-700 font-semibold dark:text-gray-300 ms-2">Explore Categories</h2>
                {/* <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-black" />
                  <div className="space-y-2 ">
                    <Skeleton className="h-4 w-[250px] bg-black"  />
                    <Skeleton className="h-4 w-[200px] bg-black" />
                  </div>
                </div> */}
                <div className=' flex flex-col gap-1 mt-2 w-full'>
                  {explore.map((explore) => (
                    <div key={explore.id} className='text-sm text-gray-500 font-medium line-clamp-1 hover:bg-gray-200 p-2 rounded-md flex justify-between  items-center w-full group'>
                      <span>{explore.title}</span>
                      <GoChevronRight className='w-10 h-5' />
                    </div>
                    
                  ))}
                      <div className={`${isHovered ? "absolute top-0  -right-[17rem] border dark:border-gray-800 p-6  dark:bg-gray-900 bg-[#f5f5f5] w-[15vw] h-[110vh] z-50 " : "hidden"}`}>
                      <h2 className="text-base text-gray-700 font-semibold dark:text-gray-300 ms-2">Popular Courses</h2>
                      {explore.map((explore) => (
                    <div key={explore.id} className='text-sm text-gray-500 font-medium line-clamp-1 hover:bg-gray-200 p-2 rounded-md flex gap-2 justify-between  items-center w-full group'>
                      <span>{explore.title}</span>
                    </div>
                    
                  ))}
                    </div>
                </div>
              </div>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col gap-1 items-center'>
                <GoRepo className='w-5 h-5' />
                <span className=' font-medium text-[0.8rem]'>Courses</span>
              </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col gap-1 items-center'>
              <GoBookmark className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Saved</span>
            </div>
          </a>

          <Link to="/theme" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500  dark:hover:text-blue-300">
            <div className='flex flex-col gap-1 items-center'>
              <GoGear className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Settings</span>
            </div>
          </Link>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-300">
            <div className='flex flex-col gap-1 items-center'>
              <GoInfo className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Help</span>
            </div>
          </a>
        </nav>
      </aside>


    {/* fcking bottom nav */}
      <nav className="sm:flex md:flex lg:flex xl:hidden z-20 fixed bottom-0 left-0 w-full  bg-white border-t rtl:border-l rtl:border-r-0 dark:bg-gray-800 dark:border-gray-700 flex justify-around p-2">
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 flex items-center flex-col">
            <GoRepo className="w-5 h-5" />
            <span className=' font-medium text-[0.8rem] text-gray-700'>View</span>
          </a>
          <a
            href="#"
            className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 flex items-center flex-col"
          >
            <GoSearch className="w-5 h-5" />
            <span className=' font-medium text-[0.8rem] text-gray-700'>Search</span>
          </a>
          <span></span>
          <span></span>
          <a href="#" className="absolute -top-7 bg-gradient-to-r from-purple-500 to-blue-500 px-4 py-3.5 text-white rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300">
            <GoHome className="w-5 h-6" />
          </a>
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 flex items-center flex-col">
            <GoBookmark className="w-5 h-5" />
            <span className=' font-medium text-[0.8rem] text-gray-700'>Saved</span>
        </a>
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100 flex items-center flex-col">
            <GoPerson className="w-6 h-6" />
            <span className=' font-medium text-[0.8rem] text-gray-700'>Me</span>
          </a>
      </nav>
    </div>
  );
};

export default Sidebar;
