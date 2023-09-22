import { useState } from "preact/hooks";
import DropDown from "./DropDownButton.jsx";
import ButtonDynamic from "../components/ButtonDynamic.tsx";
import Breadcrumb from "./Breadcrumb.tsx";

interface User {
  name: string;
  email: string;
}

export default function Navbar() {
  const user: User = {
    name: "Matthew Smith",
    email: "matthew.smith@fathym.com",
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  function toggleDropdown() {
    setIsDropdownOpen((prevState: boolean) => !prevState);
  }

  function toggleMobile() {
    setIsMobileOpen((prevState: boolean) => !prevState);
  }

  function onClickOutsideListener() {
    isDropdownOpen ? toggleDropdown() : null;
    document.removeEventListener("click", onClickOutsideListener);
  }

  function onClickOutsideMobileListener() {
    isMobileOpen ? toggleMobile() : null;
    document.removeEventListener("click", onClickOutsideMobileListener);
  }

  return (
    <div className="min-h-full">
      <nav className="bg-slate-800">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-[#67C7C5]">
                <svg
                  fill="currentColor"
                  width="40"
                  height="40"
                  viewBox="0 0 64 64"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g>
                    <path d="M3.41,33.74l0.06,0.51c0.34,2.98,1.37,12.06,11.85,12.06c3.51,0,6.55-1.31,8.56-3.68
                        c1.96-2.31,2.77-5.47,2.23-8.66c-0.36-2.11-1.03-3.78-1.68-5.39c-0.89-2.22-1.74-4.31-1.74-7.82c0-2.88,0.9-9.59,9.23-9.59
                        c8.33,0,9.23,6.7,9.23,9.59c0,3.51-0.84,5.6-1.74,7.82c-0.65,1.61-1.32,3.27-1.68,5.39c-0.54,3.19,0.27,6.35,2.23,8.66
                        c2.01,2.37,5.04,3.68,8.56,3.68c10.48,0,11.51-9.08,11.85-12.06l0.06-0.51c0.29-2.64,0.54-2.64,1.56-2.64v-6.71
                        c-4.83,0-7.59,2.9-8.23,8.61l-0.06,0.49c-0.49,4.31-1.32,6.11-5.19,6.11c-1.53,0-2.71-0.45-3.43-1.3c-0.68-0.8-0.95-1.97-0.74-3.22
                        c0.24-1.4,0.72-2.6,1.28-4c0.99-2.46,2.23-5.52,2.23-10.33c0-8.11-4.93-16.3-15.94-16.3c-11.01,0-15.94,8.18-15.94,16.3
                        c0,4.81,1.23,7.87,2.22,10.33c0.56,1.4,1.05,2.6,1.28,4c0.21,1.24-0.06,2.41-0.74,3.22c-0.72,0.85-1.91,1.3-3.43,1.3
                        c-3.87,0-4.7-1.8-5.19-6.11L10.08,33c-0.63-5.71-3.4-8.61-8.23-8.61v6.71C2.88,31.09,3.12,31.09,3.41,33.74z" />
                    <rect x="27.6" y="24.37" width="3.15" height="5.48" />
                    <rect x="33.1" y="24.37" width="3.15" height="5.48" />
                    <path d="M60.11,49.66c-3.88,3.64-8.93,4.19-11.59,4.19c-5.07,0-9.52-1.96-12.54-5.53c-0.6-0.71-1.13-1.48-1.59-2.28
                        l-1.01-1.79h-2.91l-1.01,1.78c-0.46,0.81-1,1.58-1.59,2.29c-3.01,3.56-7.46,5.53-12.54,5.53c-2.63,0-7.62-0.53-11.48-4.08L0,53.95
                        c5.28,4.85,11.87,5.58,15.32,5.58c6.62,0,12.5-2.56,16.6-7.22c4.1,4.66,9.98,7.22,16.6,7.22c3.5,0,10.18-0.74,15.48-5.73
                        L60.11,49.66z" />
                  </g>
                </svg>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a href="#">
                    <ButtonDynamic
                      twcolor="transparent"
                      textcolor="white"
                      fontweight="normal"
                      selected
                      shadow="sm"
                      twsize="sm"
                      href="/dashboard"
                    >
                      Dashboard
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic
                      twcolor="transparent"
                      textcolor="white"
                      fontweight="normal"
                      shadow="sm"
                      twsize="sm"
                    >
                      Projects
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic
                      twcolor="transparent"
                      textcolor="white"
                      fontweight="normal"
                      shadow="sm"
                      twsize="sm"
                    >
                      Products
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic
                      twcolor="transparent"
                      textcolor="white"
                      fontweight="normal"
                      shadow="sm"
                      twsize="sm"
                    >
                      Support
                    </ButtonDynamic>
                  </a>
                  <a>
                    <DropDown user={user.name} email={user.email} />
                  </a>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>

                <div className="relative ml-3">
                  <div
                    onMouseLeave={() => {
                      document.addEventListener(
                        "click",
                        onClickOutsideListener,
                      );
                    }}
                  >
                    <button
                      type="button"
                      className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      id="user-menu-button"
                      onClick={toggleDropdown}
                      aria-expanded={isDropdownOpen}
                      aria-controls="dropdown-panel"
                      aria-haspopup="true"
                    >
                      <span className="absolute -inset-1.5"></span>
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </button>
                  </div>
                  {isDropdownOpen && (
                    <div
                      id="dropdown-panel"
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                    >
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-0"
                      >
                        Your Profile
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-1"
                      >
                        Settings
                      </a>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        id="user-menu-item-2"
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              className="-mr-2 flex md:hidden"
              onMouseLeave={() => {
                document.addEventListener(
                  "click",
                  onClickOutsideMobileListener,
                );
              }}
            >
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                onClick={toggleMobile}
                aria-expanded={isMobileOpen}
                aria-controls="mobile-menu"
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              <a
                href="/dashboard"
                className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
                aria-current="page"
              >
                Dashboard
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Team
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Projects
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Calendar
              </a>
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              >
                Reports
              </a>
            </div>
            <div className="border-t border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    {user.name}
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    {user.email}
                  </div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      <header className="bg-white dark:bg-slate-900 shadow">
        <div className="mx-auto max-w-7xl px-2 py-1 sm:px-2 lg:px-4">
          <Breadcrumb />
        </div>
      </header>

      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* Your content */}
        </div>
      </main>
    </div>
  );
}
