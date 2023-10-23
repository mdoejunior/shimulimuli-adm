"use client"
import React, {useState} from "react";
import "@/styles/globals.css"
import {fontSans} from "@/lib/fonts"
import {cn} from "@/lib/utils"
import SideBar from "@/components/partials/SideBar"
import {TailwindIndicator} from "@/components/tailwind-indicator"
import {ThemeProvider} from "@/components/theme-provider"
import Header from "@/components/Header";

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({children}: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <html lang="en" suppressHydrationWarning>
      <head/>
      <body
        className={cn(
          "min-h-screen bg-background font-mono antialiased",
          fontSans.variable
        )}
      >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="flex h-screen overflow-hidden">
          <SideBar
            sidebarOpen={sidebarOpen} // Pass sidebarOpen prop
            setSidebarOpen={setSidebarOpen} // Pass setSidebarOpen prop
          />
          {/* Content area */}
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            <div className="flex-1">{children}</div>
          </div>
          <TailwindIndicator/>
        </div>
      </ThemeProvider>
      </body>
      </html>
    </>
  )
}
