
import { GoPerson, GoGear, GoCodespaces, GoArchive } from "react-icons/go";
import { AiOutlineCamera } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";



const SideSettings = () => {

  const location = useLocation();
  const [activeLink, setActiveLink ] = useState(location.pathname);

  const handleActiveLink = (link: string) => {
    setActiveLink(link)
  }



  return (

    <div className="w-full  py-4">
      <ul className="flex flex-col gap-3">
        <li className={`hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
            activeLink === "/profile" ? "bg-blue-100 dark:bg-blue-700" : ""
          }`} >
          <Link to="/profile" onClick={() => handleActiveLink("/profile")} className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoPerson className="mr-3 text-xl" />
            <span className="font-medium  text-sm">Public Profile</span>
          </Link>
        </li>

        <li className={`hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
          activeLink === "/profile-picture" ? "bg-blue-100 dark:bg-blue-700" : ""
        }`}>
          <Link to="/profile-picture" onClick={() => handleActiveLink("/profile-picture")} className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <AiOutlineCamera className="mr-3 text-xl" />
            <span className="font-medium text-sm">Profile Picture</span>
          </Link>
        </li>

        <li className={`hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
          activeLink === "/account-settings" ? "bg-blue-100 dark:bg-blue-700" : ""
        }`}>
          <Link to="/account-settings"  onClick={() => handleActiveLink("/account-settings")} className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoGear className="mr-3 text-xl" />
            <span className="font-medium text-sm">Account Settings</span>
          </Link>
        </li>
        <li className={`hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
          activeLink === "/theme" ? "bg-blue-100 dark:bg-blue-700" : ""
        }`}>
          <Link to="/theme" onClick={() => handleActiveLink("/theme")} className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoCodespaces className="mr-3 text-lg" />
            <span className="font-medium  text-sm">System Preference</span>
          </Link>
        </li>
        <li className={`hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
          activeLink === "/close-account" ? "bg-blue-100 dark:bg-blue-700" : ""
        }`}>    <Link to="/close-account" onClick={() => handleActiveLink("/close-account")} className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoArchive className="mr-3 text-lg" />
            <span className="font-mediu text-sm">Close Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideSettings;
