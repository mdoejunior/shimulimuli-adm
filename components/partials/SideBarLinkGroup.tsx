"use client"
import React, { useState, ReactNode } from 'react';

interface SidebarLinkGroupProps {
  activecondition: boolean;
  children: (handleClick: () => void, open: boolean) => ReactNode;
}

const SidebarLinkGroup: React.FC<SidebarLinkGroupProps> = ({
                                                             activecondition,
                                                             children,
                                                           }) => {
  const [open, setOpen] = useState(activecondition);

  const handleClick = (): void => {
    setOpen(!open);
  };

  return (
    <li className={`mb-0.5 rounded-sm px-3 py-2 last:mb-0 ${activecondition && 'bg-slate-900'}`}>
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;
