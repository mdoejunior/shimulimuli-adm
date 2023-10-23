import React, { useState } from 'react';
import UserMenu from './partials/UserMenu';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ sidebarOpen, setSidebarOpen }) => {

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-8 h-7 bg-teal-500 rounded-md p-1 fill-current text-white"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>

          </div>

          {/* Header: Center */}
          <h1 className="text-3xl font-bold lg:inline-block md:inline-block hidden sm:hidden text-gray-900 text-center leading-tight">
            <span className="block italic text-teal-600 text-shadow-xl">Main Header</span>
          </h1>

          {/* Header: Right side */}
          <div className="flex items-center">
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
             Issa Mdoe
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;
