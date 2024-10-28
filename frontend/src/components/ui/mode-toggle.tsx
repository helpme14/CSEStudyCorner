import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";


export function ModeToggle() {
  const { setTheme, theme } = useTheme(); 

  

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div>
        <input
          type="radio"
          value="light"
          id="light"
          checked={theme === "light"}
          onChange={() => setTheme("light")}
          className="peer hidden [&:checked_+_label_svg]:block"
        />
        <label
          htmlFor="light"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500 dark:peer-checked:ring-primary-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <div className="flex items-center gap-2">
            <Sun className="icon icon-tabler icon-tabler-sun" strokeWidth={1.75} />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-700 dark:text-gray-100">Light</p>
              {theme === "light" && (
                <svg
                  className="h-5 w-5 text-primary-600 dark:text-primary-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>

      <div>
        <input
          type="radio"
          value="dark"
          id="dark"
          checked={theme === "dark"}
          onChange={() => setTheme("dark")}
          className="peer hidden [&:checked_+_label_svg]:block"
        />
        <label
          htmlFor="dark"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500 dark:peer-checked:ring-primary-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <div className="flex items-center gap-2">
            <Moon className="icon icon-tabler icon-tabler-moon" strokeWidth={1.75} />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-700 dark:text-gray-100">Dark</p>
              {theme === "dark" && (
                <svg
                  className="h-5 w-5 text-primary-600 dark:text-primary-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>

  


      <div>
        <input
          type="radio"
          value="system"
          id="system"
          checked={theme === "system"}
          onChange={() => setTheme("system")}
          className="peer hidden [&:checked_+_label_svg]:block"
        />
        <label
          htmlFor="system"
          className="block cursor-pointer rounded-lg border border-gray-100 bg-white p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-primary-500 peer-checked:ring-1 peer-checked:ring-primary-500 dark:peer-checked:ring-primary-400 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        >
          <div className="flex items-center gap-2">
            <Monitor className="icon icon-tabler icon-tabler-device-desktop" strokeWidth={1.75} />
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-gray-700 dark:text-gray-100">System</p>
              {theme === "system" && (
                <svg
                  className="h-5 w-5 text-primary-600 dark:text-primary-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
