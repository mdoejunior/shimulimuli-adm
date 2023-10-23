import React, { useState, useRef, useEffect } from 'react';
// import { useRouter } from 'next/router';
import Link from 'next/link';
import Transition from './Transition';

function UserMenu() {
  // const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget }) => {
      if (!dropdownOpen || dropdown.current?.contains(target as Node) || trigger.current?.contains(target as Node)) return;
      setDropdownOpen(false);
    };
    // @ts-ignore
    document.addEventListener('click', clickHandler);
    // @ts-ignore
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // @ts-ignore
  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
             className="lucide lucide-user-circle-2">
          <path d="M18 20a6 6 0 0 0-12 0"/>
          <circle cx="12" cy="10" r="4"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <div className="flex items-center truncate">
          <span className="truncate ml-2 text-sm font-medium group-hover:text-slate-800">Credable</span>
          <svg className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400" viewBox="0 0 12 12">
            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
          </svg>
        </div>
      </button>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">Credable</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link href="/" passHref>
                <a
                  className="font-medium text-sm text-red-500 hover:text-indigo-600 flex items-center py-1 px-3"
                  // onClick={() => router.push("/")}
                >
                  Log Out
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  );
}

export default UserMenu;
