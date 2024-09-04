import { FaUser, FaCog, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa'; // Example icons

const SideSettings = () => {
  return (
    <div className="w-full p-4 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      <span className="text-3xl font-semibold mb-4 block text-gray-900 dark:text-white">Settings</span>
      <ul className="flex flex-col gap-3">
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <FaUser className="mr-3 text-xl" />
            <span className="font-medium">Public Profile</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <FaCog className="mr-3 text-xl" />
            <span className="font-medium">Account Settings</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <FaTachometerAlt className="mr-3 text-xl" />
            <span className="font-medium">System Preference</span>
          </a>
        </li>
        <li className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-300">
          <a href="#" className="flex items-center p-3 text-gray-800 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
            <FaSignOutAlt className="mr-3 text-xl" />
            <span className="font-medium">Close Account</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SideSettings;
