
import { GoPerson, GoGear, GoCodespaces, GoArchive } from "react-icons/go";
import { Link } from "react-router-dom";


const SideSettings = () => {
  return (

    <div className="w-full py-4">
      <ul className="flex flex-col gap-3">
        <li className="transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link to="/home/profile" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoPerson className="mr-3 text-xl" />
            <span className="text-sm font-medium">Public Profile</span>
          </Link>
        </li>
        <li className="transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link to="/home/account-settings" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoGear className="mr-3 text-xl" />
            <span className="text-sm font-medium">Account Settings</span>
          </Link>
        </li>
        <li className="transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link to="/home/theme" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoCodespaces className="mr-3 text-lg" />
            <span className="text-sm font-medium">System Preference</span>
          </Link>
        </li>
        <li className="transition-colors duration-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
          <Link to="/home/close-account" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoArchive className="mr-3 text-lg" />
            <span className="text-sm font-mediu">Close Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideSettings;
