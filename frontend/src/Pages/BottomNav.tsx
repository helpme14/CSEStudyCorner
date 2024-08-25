import { HomeIcon, StarIcon, LocationMarkerIcon } from '@heroicons/react/outline';

const BottomNav = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <HomeIcon className="w-6 h-6" />
          <span className="text-sm">Recents</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <StarIcon className="w-6 h-6" />
          <span className="text-sm">Favorites</span>
        </a>
        <a href="#" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
          <LocationMarkerIcon className="w-6 h-6" />
          <span className="text-sm">Nearby</span>
        </a>
      </div>
    </div>
  );
};

export default BottomNav;
