
import { GoPerson, GoGear, GoCodespaces, GoArchive } from "react-icons/go";
import { Link } from "react-router-dom";


const SideSettings = () => {
  return (

    <div className="w-full  py-4">
      <ul className="flex flex-col gap-3">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <Link to="/profile" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoPerson className="mr-3 text-xl" />
            <span className="font-medium  text-sm">Public Profile</span>
          </Link>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <Link to="/account-settings" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoGear className="mr-3 text-xl" />
            <span className="font-medium text-sm">Account Settings</span>
          </Link>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <Link to="/theme" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoCodespaces className="mr-3 text-lg" />
            <span className="font-medium  text-sm">System Preference</span>
          </Link>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <Link to="/close-account" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoArchive className="mr-3 text-lg" />
            <span className="font-mediu text-sm">Close Account</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideSettings;
