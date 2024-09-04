
import { GoPerson, GoGear, GoCodespaces, GoArchive } from "react-icons/go";

const SideSettings = () => {
  return (
    <div className="w-full p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <span className="text-3xl font-semibold mb-4 block text-gray-900 dark:text-white ml-3">Settings</span>
      <ul className="flex flex-col gap-3">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoPerson className="mr-3 text-xl" />
            <span className="font-medium">Public Profile</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoGear className="mr-3 text-xl" />
            <span className="font-medium">Account Settings</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoCodespaces className="mr-3 text-xl" />
            <span className="font-medium">System Preference</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <GoArchive className="mr-3 text-xl" />
            <span className="font-medium">Close Account</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideSettings;
