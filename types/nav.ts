import React from "react";

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface SideBar {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

