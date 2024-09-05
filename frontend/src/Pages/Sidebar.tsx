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
        <nav className="fixed flex flex-col flex-1 space-y-6">
        <nav className="fixed flex flex-col items-center flex-1 space-y-3">
          <a href="#">
            <img className="w-10 h-10 mb-3" src={logo} alt="Logo" />
          </a>

          {/* Navigation Items */}
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col items-center gap-1'>
              <GoHome className='w-6 h-6' />
              <span className=' font-medium text-[0.8rem]'>Home</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
          <div className='flex flex-col items-center gap-1'>
              <GoGlobe className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Explore</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col items-center gap-1'>
                <GoRepo className='w-5 h-5' />
                <span className=' font-medium text-[0.8rem]'>Courses</span>
              </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col items-center gap-1'>
              <GoBookmark className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Saved</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col items-center gap-1'>
              <GoGear className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Settings</span>
            </div>
          </a>

          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <div className='flex flex-col items-center gap-1'>
              <GoInfo className='w-5 h-5' />
              <span className=' font-medium text-[0.8rem]'>Help</span>
            </div>
          </a>
        </nav>
        
   
      
      </aside>


      {/* Bottom Navigation */}
    
        <nav className="fixed bottom-0 left-0 z-20 flex justify-around w-full p-4 bg-white border-t sm:flex md:flex lg:flex xl:hidden rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
          <a href="#" className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg dark:text-gray-200 dark:hover:bg-gray-800 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </a>
      <nav className="fixed bottom-0 left-0 z-20 flex justify-around w-full p-4 bg-white border-t sm:flex md:flex lg:flex xl:hidden rtl:border-l rtl:border-r-0 dark:bg-gray-900 dark:border-gray-700">
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
