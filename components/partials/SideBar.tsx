import React, {useEffect, useRef, useState} from 'react';
import Link from 'next/link';
import SidebarLinkGroup from './SideBarLinkGroup';
import ActiveLink from '../ActiveLink'
import {usePathname} from "next/navigation";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar = ({sidebarOpen, setSidebarOpen}: SidebarProps) => {
  const pathname = usePathname()
  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true');

  // close on click outside
  useEffect(() => {
    const clickHandler = ({target}: { target: EventTarget | null }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarOpen || sidebar.current.contains(target as Node) || trigger.current.contains(target as Node)) return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({keyCode}: { keyCode: number }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sidebar-expanded', String(sidebarExpanded));
      if (sidebarExpanded) {
        document.querySelector('body')?.classList.add('sidebar-expanded');
      } else {
        document.querySelector('body')?.classList.remove('sidebar-expanded');
      }
    }
  }, [sidebarExpanded]);


  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900 bg-opacity-30 transition-opacity duration-200 lg:z-auto lg:hidden ${
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`no-scrollbar lg:sidebar-expanded:!w-64 absolute left-0 top-0 z-40 flex h-screen w-64 shrink-0 flex-col overflow-y-scroll bg-slate-800 p-4 transition-all duration-200 ease-in-out lg:static lg:left-auto lg:top-auto lg:w-20 lg:translate-x-0 lg:overflow-y-auto 2xl:!w-64 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
      >
        {/* Sidebar header */}
        <div className="mb-10 flex pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="text-slate-500 hover:text-slate-400 lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
            </svg>
          </button>
          {/* Logo */}
          <Link href="/" className="block">
            <svg width="32" height="32" viewBox="0 0 32 32">
              <defs>
                <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
                  <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%"/>
                  <stop stopColor="#A5B4FC" offset="100%"/>
                </linearGradient>
                <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
                  <stop stopColor="#38BDF8" stopOpacity="0" offset="0%"/>
                  <stop stopColor="#38BDF8" offset="100%"/>
                </linearGradient>
              </defs>
              <rect fill="#6366F1" width="32" height="32" rx="16"/>
              <path
                d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                fill="#4F46E5"
              />
              <path
                d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                fill="url(#logo-a)"
              />
              <path
                d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                fill="url(#logo-b)"
              />
            </svg>
          </Link>
          <span
            className="lg:sidebar-expanded:opacity-100 ml-3 text-2xl font-medium text-teal-600 duration-200 lg:opacity-0 2xl:opacity-100">
            Shimulimuli
          </span>
        </div>
        {/* Links */}
        <div className="space-y-14">
          {/* Pages group */}
          <div>
            <h3 className="pl-3 text-xs font-semibold uppercase text-slate-500">
              <span className="lg:sidebar-expanded:hidden hidden w-6 text-center lg:block 2xl:hidden"
                    aria-hidden="true">
                •••
              </span>
              <span className="lg:sidebar-expanded:block lg:hidden 2xl:block">Pages</span>
            </h3>
            <ul className="mt-3">
              {/* Dashboard */}
              <li
                className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${pathname.includes('/') && 'bg-slate-900'}`}>
                <Link
                  href="/"
                  className={`block truncate text-slate-200 transition duration-150 ${
                    pathname.includes('/') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${
                          pathname === '/' || pathname.includes('dashboard') ? 'text-indigo-700' : 'text-slate-400'
                        }`}
                        d="M13 21V11H21V21H13ZM3 13V3H11V13H3ZM9 11V5H5V11H9ZM3 21V15H11V21H3ZM5 19H9V17H5V19ZM15 19H19V13H15V19ZM13 3H21V9H13V3ZM15 5V7H19V5H15Z"
                      ></path>
                    </svg>
                    <span
                      className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                      Dashboard
                    </span>
                  </div>
                </Link>
              </li>
              {/* Examples */}
              <SidebarLinkGroup activecondition={pathname.includes('projects')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        className={`block truncate text-slate-200 transition duration-150 ${
                          pathname.includes('projects') ? 'hover:text-teal-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${
                                  pathname.includes('projects') ? 'text-indigo-700' : 'text-slate-400'
                                }`}
                                d="M3.16113 4.46875C5.58508 2.0448 9.44716 1.9355 12.0008 4.14085C14.5528 1.9355 18.4149 2.0448 20.8388 4.46875C23.2584 6.88836 23.3716 10.741 21.1785 13.2947L13.4142 21.0858C12.6686 21.8313 11.4809 21.8652 10.6952 21.1874L10.5858 21.0858L2.82141 13.2947C0.628282 10.741 0.741522 6.88836 3.16113 4.46875ZM4.57534 5.88296C2.86819 7.59011 2.81942 10.3276 4.42902 12.0937L4.57534 12.2469L12 19.6715L17.3026 14.3675L13.7677 10.8327L12.7071 11.8934C11.5355 13.0649 9.636 13.0649 8.46443 11.8934C7.29286 10.7218 7.29286 8.8223 8.46443 7.65073L10.5656 5.54823C8.85292 4.17713 6.37076 4.23993 4.7286 5.73663L4.57534 5.88296ZM13.0606 8.71139C13.4511 8.32086 14.0843 8.32086 14.4748 8.71139L18.7168 12.9533L19.4246 12.2469C21.1819 10.4896 21.1819 7.64032 19.4246 5.88296C17.7174 4.17581 14.9799 4.12704 13.2139 5.73663L13.0606 5.88296L9.87864 9.06494C9.51601 9.42757 9.49011 9.99942 9.80094 10.3919L9.87864 10.4792C10.2413 10.8418 10.8131 10.8677 11.2056 10.5569L11.2929 10.4792L13.0606 8.71139Z">
                              </path>
                            </svg>
                            <span
                              className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">Projects</span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${open && 'rotate-180'}`}
                                 viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/projects"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 1
                              </span>
                            </ActiveLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/projects/list"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 2
                              </span>
                            </ActiveLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('services')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        className={`block truncate text-slate-200 transition duration-150 ${
                          pathname.includes('services') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${
                                  pathname.includes('services') ? 'text-indigo-700' : 'text-slate-400'
                                }`}
                                d="M5 12.5C5 12.8134 5.46101 13.3584 6.53047 13.8931C7.91405 14.5849 9.87677 15 12 15C14.1232 15 16.0859 14.5849 17.4695 13.8931C18.539 13.3584 19 12.8134 19 12.5V10.3287C17.35 11.3482 14.8273 12 12 12C9.17273 12 6.64996 11.3482 5 10.3287V12.5ZM19 15.3287C17.35 16.3482 14.8273 17 12 17C9.17273 17 6.64996 16.3482 5 15.3287V17.5C5 17.8134 5.46101 18.3584 6.53047 18.8931C7.91405 19.5849 9.87677 20 12 20C14.1232 20 16.0859 19.5849 17.4695 18.8931C18.539 18.3584 19 17.8134 19 17.5V15.3287ZM3 17.5V7.5C3 5.01472 7.02944 3 12 3C16.9706 3 21 5.01472 21 7.5V17.5C21 19.9853 16.9706 22 12 22C7.02944 22 3 19.9853 3 17.5ZM12 10C14.1232 10 16.0859 9.58492 17.4695 8.89313C18.539 8.3584 19 7.81342 19 7.5C19 7.18658 18.539 6.6416 17.4695 6.10687C16.0859 5.41508 14.1232 5 12 5C9.87677 5 7.91405 5.41508 6.53047 6.10687C5.46101 6.6416 5 7.18658 5 7.5C5 7.81342 5.46101 8.3584 6.53047 8.89313C7.91405 9.58492 9.87677 10 12 10Z"
                              />
                            </svg>
                            <span
                              className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">Services</span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${open && 'rotate-180'}`}
                                 viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/services"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 1
                              </span>
                            </ActiveLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/services/list"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 2
                              </span>
                            </ActiveLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup activecondition={pathname.includes('connector')}>
                {(handleClick, open) => {
                  return (
                    <>
                      <a
                        className={`block truncate text-slate-200 transition duration-150 ${
                          pathname.includes('connector') ? 'hover:text-slate-200' : 'hover:text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                              <path
                                className={`fill-current ${
                                  pathname.includes('connector') ? 'text-indigo-700' : 'text-slate-400'
                                }`}
                                d="M20 20.0001C20 20.5524 19.5523 21.0001 19 21.0001H5C4.44772 21.0001 4 20.5524 4 20.0001V11.0001L1 11.0001L11.3273 1.61162C11.7087 1.26488 12.2913 1.26488 12.6727 1.61162L23 11.0001L20 11.0001V20.0001ZM8 15.0001V17.0001H16V15.0001H8Z">
                              </path>
                            </svg>
                            <span
                              className="lg:sidebar-expanded:opacity-100 ml-3 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">Connectors</span>
                          </div>
                          {/* Icon */}
                          <div className="ml-2 flex shrink-0">
                            <svg className={`ml-1 h-3 w-3 shrink-0 fill-current text-slate-400 ${open && 'rotate-180'}`}
                                 viewBox="0 0 12 12">
                              <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                            </svg>
                          </div>
                        </div>
                      </a>
                      <div className="lg:sidebar-expanded:block lg:hidden 2xl:block">
                        <ul className={`mt-1 pl-9 ${!open && 'hidden'}`}>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/connector"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 1
                              </span>
                            </ActiveLink>
                          </li>
                          <li className="mb-1 last:mb-0">
                            <ActiveLink
                              href="/connector/list"
                              activeClassName="text-indigo-500"
                              inactiveClassName="text-slate-400 hover:text-slate-200"
                            >
                              <span
                                className="lg:sidebar-expanded:opacity-100 text-sm font-medium duration-200 lg:opacity-0 2xl:opacity-100">
                                Link 2
                              </span>
                            </ActiveLink>
                          </li>
                        </ul>
                      </div>
                    </>
                  );
                }}
              </SidebarLinkGroup>

              <li
                className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('core-values') && 'bg-slate-900'}`}>
                <Link
                  href="/core-values"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('core-values') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${pathname.includes('core-values') ? 'text-indigo-700' : 'text-slate-400'}`}
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM8.32864 12.3036C8.28909 13.1546 8.36645 14.0015 8.44669 14.8484C8.45244 14.9088 8.47434 14.9217 8.52744 14.9287C8.93342 14.982 9.33986 15.0298 9.74853 15.0555C10.7131 15.116 11.6771 15.1936 12.6447 15.1398C13.1941 15.1092 13.7446 15.0924 14.2925 15.0446C15.0732 14.9766 15.8524 14.8895 16.6224 14.7333C17.5814 14.5388 18.5298 14.3079 19.4238 13.888C19.829 13.6976 20.2136 13.4729 20.537 13.1521C20.7745 12.9167 20.9448 12.6445 20.9472 12.2929C20.9493 11.9788 20.9333 11.6646 20.9022 11.3524C20.8281 10.606 20.6748 9.87659 20.4205 9.17197C19.8367 7.55443 18.9115 6.18315 17.5955 5.10253C16.4576 4.16822 15.1751 3.5396 13.744 3.23907C13.2445 3.13419 12.7381 3.09535 12.2299 3.05885C11.6571 3.01769 11.1662 3.17993 10.7418 3.57258C10.2472 4.03031 9.90481 4.5975 9.62019 5.2061C8.95309 6.63257 8.64727 8.15994 8.45434 9.71384C8.34789 10.5713 8.28789 11.435 8.32864 12.3036ZM11.8988 7.27379C12.8578 7.30486 13.6687 7.59825 14.3926 8.12993C15.2883 8.78776 15.8625 9.65802 16.1068 10.742C16.1752 11.0457 16.2039 11.3537 16.2104 11.6637C16.2148 11.8727 16.1005 12.0258 15.9478 12.1541C15.6412 12.4116 15.2773 12.5552 14.898 12.6615C14.1573 12.8692 13.4021 12.9885 12.6328 13.028C12.1326 13.0537 11.6331 13.0628 11.133 13.038C10.9406 13.0285 10.7485 13.0136 10.5561 13.0061C10.4964 13.0038 10.4758 12.9861 10.4725 12.9246C10.4491 12.4909 10.4152 12.0572 10.4219 11.6228C10.4376 10.5969 10.5163 9.57811 10.819 8.5893C10.9197 8.26005 11.0423 7.93967 11.2396 7.6532C11.4118 7.40327 11.6175 7.21569 11.8988 7.27379Z">
                      </path>
                    </svg>
                    <span
                      className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Core Values</span>
                  </div>
                </Link>
              </li>

              <li className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${pathname.includes('about') && 'bg-slate-900'}`}>
                <Link
                  href="/about"
                  className={`block text-slate-200 truncate transition duration-150 ${
                    pathname.includes('about') ? 'hover:text-slate-200' : 'hover:text-white'
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="shrink-0 h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        className={`fill-current ${pathname.includes('about') ? 'text-indigo-700' : 'text-slate-400'}`}
                        d="M1.94631 9.31555C1.42377 9.14137 1.41965 8.86034 1.95706 8.6812L21.0433 2.31913C21.5717 2.14297 21.8748 2.43878 21.7268 2.95706L16.2736 22.0433C16.1226 22.5718 15.8179 22.5901 15.5946 22.0877L12.0002 14.0002L18.0002 6.00017L10.0002 12.0002L1.94631 9.31555Z">
                      </path>
                    </svg>
                    <span
                      className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">Transactions</span>
                  </div>
                </Link>
              </li>

              {/* Settings */
              }
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path className="text-slate-400"
                      d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"/>
                <path className="text-slate-600" d="M3 23H1V1h2z"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
