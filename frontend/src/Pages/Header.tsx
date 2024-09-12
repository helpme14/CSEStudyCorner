
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Nav = () => {

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full ">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="w-auto h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white" onClick={toggleMenu}>
              <span className="sr-only">Open main menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ">
            <Link  to="/" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Home</Link>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Review Materials</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Practice Tests</a>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">About Us</a>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to="/registration" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">Log in <span aria-hidden="true">&rarr;</span></Link>
          </div>
        </nav>
        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden dark:text-white " role="dialog" aria-modal="true">
            <div className="fixed inset-0 z-50"></div>
            <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5">
                  <span className="sr-only">Your Company</span>
                  <img className="w-auto h-8" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </a>
                <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-white" onClick={toggleMenu}>
                  <span className="sr-only">Close menu</span>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flow-root mt-6">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 space-y-2">
                    <a href="#" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">Home</a>
                    <a href="#" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">Review Materials</a>
                    <a href="#" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">Practice Tests</a>
                    <a href="#" className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 rounded-lg hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">About Us</a>
                  </div>
                  <div className="py-6">
                    <Link to="/registration" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-gray-500">Log in</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
  )
}

export default Nav