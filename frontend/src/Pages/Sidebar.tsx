import logo from '../assets/StudyCorner-logo.png';

import { GoHome, GoGlobe, GoRepo, GoBookmark, GoGear, GoInfo, GoSearch } from "react-icons/go";
interface SidebarProps {
  className?: string; 
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {


  return (
    <div className={`relative ${className}`}>
      {/* Sidebar */}
      <aside
        className={`sm:hidden md:hidden lg:hidden xl:flex top-0 left-0  hidden flex-col items-center w-[4.5rem] h-full py-8 overflow-y-auto bg-[#f5f5f5] border-r rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700`}
      >
        <nav className="flex flex-col flex-1 space-y-3 items-center fixed">
          <a href="#">
            <img className="w-10 h-10 mb-3" src={logo} alt="Logo" />
          </a>

          {/* Navigation Items */}
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col gap-1 items-center'>
              <GoHome className='w-6 h-6' />
              <span className=' font-medium text-[0.8rem]'>Home</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <div className='flex flex-col gap-1 items-center'>
              <GoGlobe className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Explore</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col gap-1 items-center'>
                <GoRepo className='w-5 h-5' />
                <span className=' font-medium text-[0.8rem]'>Courses</span>
              </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col gap-1 items-center'>
              <GoBookmark className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Saved</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col gap-1 items-center'>
              <GoGear className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Settings</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col gap-1 items-center'>
              <GoInfo className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Help</span>
            </div>
          </a>
        </nav>


      </aside>


      {/* Bottom Navigation */}
    
      <nav className="sm:flex md:flex lg:flex xl:hidden z-20 fixed bottom-0 left-0 w-full bg-white border-t rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700 flex justify-around p-4">
        <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <GoHome className="w-5 h-6" />
        </a>

        <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <GoSearch className="w-5 h-5" />
        </a>
        
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
