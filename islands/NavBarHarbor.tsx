import { useState } from "preact/hooks";
import DropDown from "./DropDownButton.jsx";
import ButtonDynamic from "../components/ButtonDynamic.tsx";
import Breadcrumb from "./Breadcrumb.tsx";

interface User {
  name: string;
  email: string;
}

export default function NavbarHarbor() {
  const user: User = {
    name: "Matthew Smith",
    email: "matthew.smith@fathym.com"
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
      <nav className="bg-slate-100">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-[#67C7C5]">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" height="55" preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 208.1 84.6" style="enable-background:new 0 0 208.1 84.6;">
              <g>
                <path fill="#6E2A37" d="M21.8,42.3V28H10.3v14.3H3.6V8.2h6.7v13.9h11.6V8.2h6.7v34.2H21.8z"/>
                <path fill="#6E2A37" d="M48.8,42.3v-2.2C48,41,47.1,41.6,46.2,42s-2.1,0.6-3.5,0.6c-2.8,0-4.9-0.7-6.4-2.2c-0.7-0.7-1.2-1.5-1.5-2.5
                  c-0.4-1-0.5-2-0.5-3.1c0-1,0.2-1.9,0.5-2.8c0.4-0.9,0.9-1.6,1.6-2.3c0.7-0.7,1.6-1.2,2.7-1.6c1.1-0.4,2.3-0.6,3.8-0.6h5.9v-1.2
                  c0-1.4-0.4-2.4-1.1-3s-1.9-0.9-3.6-0.9c-0.6,0-1.1,0-1.6,0.1c-0.4,0.1-0.9,0.2-1.2,0.4c-0.4,0.2-0.7,0.4-1,0.6
                  c-0.3,0.3-0.6,0.6-1,1l-4-3.9c1.2-1.3,2.5-2.3,3.9-2.7c1.4-0.5,3.1-0.7,5.2-0.7c3.5,0,6.2,0.7,8,2.2s2.7,3.7,2.7,6.6v16.5H48.8z
                  M48.7,31.8h-4.9c-1.1,0-2,0.2-2.6,0.7c-0.6,0.5-0.9,1.2-0.9,2.1c0,0.9,0.3,1.6,0.9,2.1c0.6,0.5,1.5,0.8,2.7,0.8
                  c0.9,0,1.6-0.1,2.2-0.2c0.6-0.1,1.2-0.5,1.7-1c0.6-0.6,0.9-1.6,0.9-3.2V31.8z"/>
                <path fill="#6E2A37" d="M75.2,24.1c-0.5-0.5-1-0.8-1.4-1.1c-0.5-0.3-1.1-0.4-1.9-0.4c-0.5,0-1,0.1-1.4,0.3c-0.5,0.2-0.9,0.5-1.3,0.8
                  c-0.4,0.4-0.7,0.9-0.9,1.4s-0.4,1.3-0.4,2.1v15.1h-6.2v-25h6.1v2.4c0.6-0.7,1.5-1.4,2.6-1.9S72.7,17,74,17c1.2,0,2.3,0.2,3.2,0.5
                  c0.9,0.4,1.8,1,2.7,1.8L75.2,24.1z"/>
                <path fill="#6E2A37" d="M104.4,29.8c0,0.9,0,1.9,0,2.9c0,1-0.1,2-0.3,2.9c-0.2,0.9-0.4,1.8-0.8,2.6c-0.4,0.8-0.8,1.6-1.4,2.2
                  c-0.7,0.7-1.6,1.3-2.7,1.7c-1.1,0.4-2.2,0.6-3.4,0.6c-1.3,0-2.5-0.2-3.5-0.6c-1-0.4-1.9-1.1-2.8-2v2.4h-6V8.2h6.2v11.4
                  c0.8-0.9,1.7-1.6,2.7-1.9c1-0.4,2.1-0.6,3.4-0.6c1.2,0,2.4,0.2,3.4,0.6c1.1,0.4,2,1,2.7,1.7c0.6,0.6,1.1,1.4,1.4,2.2
                  c0.4,0.8,0.6,1.7,0.8,2.6c0.2,0.9,0.3,1.9,0.3,2.9C104.4,27.9,104.4,28.9,104.4,29.8z M98.2,29.8c0-1,0-2-0.1-2.8
                  c-0.1-0.9-0.3-1.6-0.6-2.3c-0.3-0.6-0.7-1.1-1.3-1.5c-0.6-0.4-1.3-0.6-2.2-0.6s-1.7,0.2-2.2,0.6c-0.6,0.4-1,0.9-1.3,1.5
                  c-0.3,0.6-0.5,1.4-0.6,2.3c-0.1,0.9-0.1,1.8-0.1,2.8c0,1,0,2,0.1,2.9c0.1,0.9,0.3,1.6,0.6,2.3c0.3,0.6,0.7,1.1,1.3,1.5
                  c0.6,0.4,1.3,0.6,2.2,0.6s1.7-0.2,2.2-0.6c0.6-0.4,1-0.9,1.3-1.5c0.3-0.6,0.5-1.4,0.6-2.3C98.1,31.8,98.2,30.8,98.2,29.8z"/>
                <path fill="#6E2A37" d="M130.5,29.8c0,2.3-0.2,4.2-0.6,5.7c-0.4,1.5-1.1,2.9-2.3,4.1c-0.8,0.8-1.8,1.6-3.1,2.2
                  c-1.3,0.6-2.8,0.9-4.7,0.9s-3.4-0.3-4.7-0.9c-1.3-0.6-2.3-1.3-3-2.2c-1.1-1.2-1.9-2.5-2.3-4.1c-0.4-1.5-0.6-3.4-0.6-5.7
                  c0-2.3,0.2-4.2,0.6-5.7c0.4-1.5,1.1-2.8,2.3-4c0.8-0.8,1.8-1.6,3-2.2c1.3-0.6,2.8-0.9,4.7-0.9s3.4,0.3,4.7,0.9
                  c1.3,0.6,2.3,1.3,3.1,2.2c1.1,1.2,1.9,2.5,2.3,4C130.3,25.6,130.5,27.5,130.5,29.8z M124.2,29.8c0-1.3-0.1-2.5-0.2-3.5
                  c-0.2-1-0.6-1.9-1.2-2.5c-0.7-0.7-1.7-1.1-2.9-1.1c-1.2,0-2.1,0.4-2.9,1.1c-0.6,0.6-1,1.5-1.2,2.5c-0.2,1-0.2,2.2-0.2,3.5
                  c0,1.3,0.1,2.5,0.2,3.6c0.2,1.1,0.6,1.9,1.2,2.5c0.7,0.7,1.7,1.1,2.9,1.1c1.2,0,2.2-0.4,2.9-1.1c0.6-0.6,1-1.5,1.2-2.5
                  C124.1,32.3,124.2,31.1,124.2,29.8z"/>
                <path fill="#6E2A37" d="M150,24.1c-0.5-0.5-1-0.8-1.4-1.1c-0.5-0.3-1.1-0.4-1.9-0.4c-0.5,0-1,0.1-1.4,0.3c-0.5,0.2-0.9,0.5-1.3,0.8
                  c-0.4,0.4-0.7,0.9-0.9,1.4s-0.4,1.3-0.4,2.1v15.1h-6.2v-25h6.1v2.4c0.6-0.7,1.5-1.4,2.6-1.9s2.4-0.8,3.7-0.8c1.2,0,2.3,0.2,3.2,0.5
                  c0.9,0.4,1.8,1,2.7,1.8L150,24.1z"/>
              </g>
              <g>
                <path fill="#3E5F7A" d="M3.6,44.6h13.3c1.4,0,2.7,0.2,3.9,0.5c1.2,0.4,2.2,0.9,3.1,1.7c1,0.8,1.8,1.8,2.4,3.1c0.7,1.3,1,2.7,1,4.2
                  c0,2.2-0.6,4.2-1.8,5.8s-2.8,2.9-4.9,3.6l7.9,15.2h-6.1l-7.1-14.6H8.8v14.6H3.6V44.6z M8.8,59.6h7.8c2,0,3.4-0.5,4.4-1.6
                  s1.4-2.4,1.4-3.8c0-0.9-0.2-1.7-0.5-2.3c-0.3-0.7-0.7-1.2-1.3-1.6c-0.5-0.4-1-0.6-1.6-0.8s-1.3-0.3-2.2-0.3H8.8V59.6z"/>
                <path fill="#3E5F7A" d="M36.1,68.4c0,2,0.6,3.5,1.7,4.5c1.1,1,2.5,1.5,4.2,1.5c0.2,0,0.4,0,0.6,0c0.2,0,0.4,0,0.6-0.1
                  c0.7-0.1,1.5-0.4,2.2-0.8c0.7-0.4,1.4-0.9,2-1.5l3.6,3c-1.2,1.4-2.5,2.4-4.1,3C45.3,78.7,43.7,79,42,79c-0.3,0-0.6,0-0.9,0
                  c-0.3,0-0.6,0-0.9-0.1c-2.2-0.3-4.3-1.3-6.1-3c-1.9-1.7-2.8-4.8-2.8-9.2c0-4.2,0.9-7.3,2.7-9.1s3.7-3,5.9-3.3
                  c0.3,0,0.5-0.1,0.7-0.1c0.2,0,0.5,0,0.7,0c2.7,0,5,0.9,7,2.8c2,1.9,3,4.4,3,7.5v4H36.1z M46.4,64.4c-0.1-1.9-0.6-3.3-1.5-4.2
                  s-2.2-1.4-3.6-1.4c-1.4,0-2.6,0.5-3.6,1.4s-1.5,2.4-1.5,4.2H46.4z"/>
                <path fill="#3E5F7A" d="M57.2,71.3c1.1,1,2.2,1.8,3.4,2.3c1.2,0.5,2.6,0.8,4.3,0.8c1.4,0,2.6-0.3,3.5-0.8c0.9-0.5,1.3-1.3,1.3-2.3
                  c0-0.9-0.3-1.5-0.9-1.8s-1.3-0.5-2.1-0.6l-4.3-0.4c-2-0.2-3.7-0.8-5-2c-1.3-1.2-2-2.8-2-4.9c0-2.5,0.9-4.3,2.6-5.6
                  c1.7-1.3,3.9-1.9,6.5-1.9c2.1,0,4,0.3,5.5,0.9c1.5,0.6,2.9,1.4,4.1,2.4l-3,3.6c-1-0.7-2-1.2-3-1.6c-1-0.4-2.2-0.6-3.5-0.6
                  c-1.6,0-2.7,0.3-3.3,0.8c-0.6,0.6-0.9,1.3-0.9,2.1c0,0.5,0.2,1,0.7,1.5s1.3,0.7,2.5,0.8l4,0.3c2.5,0.2,4.3,0.9,5.4,2.3
                  c1.1,1.4,1.6,3,1.6,5c0,2.4-1,4.2-2.9,5.5S67.3,79,64.5,79c-2,0-3.8-0.4-5.6-1.1c-1.8-0.7-3.5-1.8-5.1-3.3L57.2,71.3z"/>
                <path fill="#3E5F7A" d="M83.2,68.4c0,2,0.6,3.5,1.7,4.5c1.1,1,2.5,1.5,4.2,1.5c0.2,0,0.4,0,0.6,0c0.2,0,0.4,0,0.6-0.1
                  c0.7-0.1,1.5-0.4,2.2-0.8c0.7-0.4,1.4-0.9,2-1.5l3.6,3c-1.2,1.4-2.5,2.4-4.1,3c-1.5,0.6-3.1,0.9-4.7,0.9c-0.3,0-0.6,0-0.9,0
                  c-0.3,0-0.6,0-0.9-0.1c-2.2-0.3-4.3-1.3-6.1-3c-1.9-1.7-2.8-4.8-2.8-9.2c0-4.2,0.9-7.3,2.7-9.1s3.7-3,5.9-3.3
                  c0.3,0,0.5-0.1,0.7-0.1c0.2,0,0.5,0,0.7,0c2.7,0,5,0.9,7,2.8c2,1.9,3,4.4,3,7.5v4H83.2z M93.5,64.4c-0.1-1.9-0.6-3.3-1.5-4.2
                  s-2.2-1.4-3.6-1.4c-1.4,0-2.6,0.5-3.6,1.4s-1.5,2.4-1.5,4.2H93.5z"/>
                <path fill="#3E5F7A" d="M116.3,76.6L116.3,76.6c-0.6,0.8-1.3,1.4-2.2,1.8s-2.2,0.6-3.9,0.6c-2.7,0-4.8-0.7-6.3-2.1
                  c-1.5-1.4-2.3-3.2-2.3-5.3c0-2,0.7-3.6,2-5.1c1.3-1.4,3.3-2.1,5.9-2.1h6.8v-2.5c0-1.2-0.4-2-1.2-2.4c-0.8-0.5-2.1-0.7-3.8-0.7
                  c-1.3,0-2.3,0.1-2.9,0.4c-0.7,0.3-1.2,0.8-1.7,1.5l-3.8-2.9c0.9-1.3,2.1-2.2,3.4-2.8c1.4-0.5,3-0.8,4.8-0.8c3,0,5.4,0.6,7.3,1.8
                  c1.9,1.2,2.8,3.3,2.8,6.3v16.6h-4.9V76.6z M116.3,68.4h-5.9c-1.4,0-2.5,0.3-3.2,0.8c-0.7,0.5-1,1.2-1,2.1c0,0.8,0.4,1.5,1.1,2.1
                  c0.7,0.6,1.9,0.9,3.6,0.9c2,0,3.5-0.2,4.3-0.7s1.2-1.6,1.2-3.5V68.4z"/>
                <path fill="#3E5F7A" d="M127.5,54.4h4.9V57h0.1c0.8-1,1.7-1.7,2.8-2.2c1.1-0.5,2.3-0.7,3.6-0.7c1,0,1.9,0.2,2.7,0.5s1.6,0.8,2.4,1.4
                  l-3.6,4.2c-0.3-0.2-0.5-0.4-0.7-0.5c-0.2-0.1-0.4-0.3-0.7-0.4c-0.3-0.1-0.6-0.2-0.9-0.2c-0.3-0.1-0.6-0.1-1-0.1
                  c-1.2,0-2.3,0.4-3.3,1.2c-1,0.8-1.5,2.1-1.5,3.9v14.6h-4.9V54.4z"/>
                <path fill="#3E5F7A" d="M163.2,74.8c-1.1,1.2-2.3,2.2-3.8,3s-3.1,1.2-5,1.2c-2.8,0-5.4-1-7.6-2.9c-2.3-1.9-3.4-5.1-3.4-9.5
                  c0-4.5,1.1-7.7,3.4-9.6c2.3-1.9,4.8-2.9,7.6-2.9c1.9,0,3.5,0.4,5,1.2s2.7,1.8,3.8,3l-3.6,3.2c-0.6-0.7-1.3-1.3-2.2-1.8
                  c-0.8-0.5-1.8-0.7-2.8-0.7c-2,0-3.5,0.6-4.7,1.8c-1.1,1.2-1.7,3.1-1.7,5.8c0,2.6,0.6,4.5,1.7,5.7c1.1,1.2,2.7,1.8,4.7,1.8
                  c1,0,2-0.2,2.8-0.7c0.8-0.5,1.6-1.1,2.2-1.8L163.2,74.8z"/>
                <path fill="#3E5F7A" d="M166.7,44.6h4.9V57h0.1c0.8-1,1.7-1.7,2.8-2.2c1.1-0.5,2.3-0.7,3.6-0.7c0.2,0,0.4,0,0.6,0c0.2,0,0.4,0,0.6,0.1
                  c1.7,0.3,3.3,1.1,4.7,2.5c1.4,1.4,2.1,3.3,2.1,5.8v16.2h-4.9V64.3c0-1.7-0.5-3-1.4-3.9c-0.9-0.9-2.1-1.4-3.4-1.4s-2.5,0.5-3.5,1.4
                  c-0.9,0.9-1.4,2.2-1.4,3.9v14.5h-4.9V44.6z"/>
              </g>
              </svg>

              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4 text-black">
                <a href="#">
                    <ButtonDynamic twcolor="transparent" textcolor="white" fontweight="normal" selected shadow="sm" twsize="sm">
                      Dashboard
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic twcolor="transparent" textcolor="white" fontweight="normal" shadow="sm" twsize="sm">
                      Projects
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic twcolor="transparent" textcolor="white" fontweight="normal" shadow="sm" twsize="sm">
                      Products
                    </ButtonDynamic>
                  </a>
                  <a href="#">
                    <ButtonDynamic twcolor="transparent" textcolor="white" fontweight="normal" shadow="sm" twsize="sm">
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
                  <div onMouseLeave={() => {
                      document.addEventListener("click", onClickOutsideListener)
                    }}>
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
                  <div id="dropdown-panel" className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-0">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-1">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" id="user-menu-item-2">
                      Sign out
                    </a>
                  </div>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden" onMouseLeave={() => {
                      document.addEventListener("click", onClickOutsideMobileListener)
                    }}>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {isMobileOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium" aria-current="page">
              Dashboard
            </a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Team
            </a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Projects
            </a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
              Calendar
            </a>
            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">
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
                <div className="text-base font-medium leading-none text-white">{user.name}</div>
                <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
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
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                Your Profile
              </a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
                Settings
              </a>
              <a href="#" className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white">
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
