"use client"

import Link, { LinkProps } from 'next/link';
import React from "react";
import {usePathname} from "next/navigation";

interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  inactiveClassName?: string;
  children: React.ReactNode;
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
                                                 href,
                                                 activeClassName,
                                                 inactiveClassName,
                                                 children,
                                                 ...rest
                                               }) => {
  const  asPath  = usePathname();
  const isActive = asPath === href;
  const className = isActive ? activeClassName : inactiveClassName;

  return (
    <Link href={href} {...rest}>
      <div className={className}>{children}</div>
    </Link>
  );
};

export default ActiveLink;
