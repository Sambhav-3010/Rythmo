"use client";

import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  IoHome,
  IoCompass,
  IoHeart,
  IoMic,
  IoPerson,
  IoHeadset,
  IoMusicalNotes,
} from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export function Sidebar({ isMobile }) {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthToken = () => {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith("authToken=")) {
          // Replace 'authToken=' with your actual cookie name
          return true;
        }
      }
      return false;
    };
    setIsLoggedIn(checkAuthToken());
  }, []);

  const navItems = [
    { href: "/", icon: IoHome, label: "Home" },
    { href: "/discover", icon: IoCompass, label: "Discover" },
    { href: "/collection", icon: IoHeart, label: "Collection" },
    { href: "/studio", icon: IoMic, label: "Studio" },
    {
      href: isLoggedIn ? "/logout" : "/auth",
      icon: IoPerson,
      label: isLoggedIn ? "Logout" : "Login",
    },
  ];

  return (
    <>
      {/* Main Sidebar/Top Bar Container */}
      <div
        className={cn(
          "glass-sidebar flex transition-all duration-500 ease-in-out relative z-50",
          // Desktop specific styles: full height, expanded width, flex-col for vertical layout
          "h-full flex-col w-[280px] md:w-[320px]",
          // Mobile specific styles: fixed top bar, full width, auto height, flex-row for horizontal layout
          isMobile
            ? "fixed top-0 left-0 right-0 h-auto w-full rounded-b-3xl shadow-2xl flex-row justify-between items-center px-4 py-3 sm:px-6 sm:py-4"
            : ""
        )}
      >
        {/* Animated border */}
        {/* Desktop border */}
        {!isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 opacity-50 rounded-r-3xl"></div>
        )}
        {/* Mobile top bar border */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 opacity-50 rounded-b-3xl"></div>
        )}

        {/* Logo and Mobile Menu Toggle (within the top bar on mobile) */}
        <div
          className={cn(
            "relative z-10 flex gap-2 items-center",
            isMobile ? "w-full" : "justify-between p-4 sm:p-6" // Mobile: full width, Desktop: justify between, padding
          )}>
          {/* Rhythmo Logo and Title */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 cosmic-gradient rounded-2xl flex items-center justify-center glow-animation">
                <IoHeadset className="text-xl sm:text-2xl text-black" />
              </div>
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-secondary rounded-full pulse-animation"></div>
            </div>
            {/* Title now visible on both desktop and mobile */}
            {isMobile && (
              <div className="transition-all duration-300 group-hover:scale-105">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Rhythmo
                </h1>
                <p className="text-[10px] text-gray-400">Your Music Universe</p>
              </div>
            )}
            {!isMobile && (
              <div className="transition-all duration-300 group-hover:scale-105">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Rhythmo
                </h1>
                <p className="text-xs text-gray-400">Your Music Universe</p>
              </div>
            )}
          </Link>

          {/* Navigation Icons for Mobile Top Bar */}
          {isMobile && (
            <div className="flex items-center gap-2 flex-grow-0">
              {navItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    size="icon" // Always icon size for mobile top bar
                    className={cn(
                      "rounded-2xl h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300", // Fixed size for icon buttons
                      location.pathname === item.href &&
                        "cosmic-gradient text-black font-semibold neon-glow"
                    )}
                    onMouseEnter={() => setHoveredItem(item.href)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <item.icon className="text-lg sm:text-xl" />
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Sidebar Content (Scrollable) */}
        {!isMobile && (
          <>
            <ScrollArea className="flex-1 px-3 sm:px-4 relative z-10">
              <div className="space-y-2 sm:space-y-3">
                {navItems.map((item) => (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant="ghost"
                      size="default" // Default size for desktop buttons
                      className={cn(
                        "w-full justify-start hover:bg-secondary rounded-2xl h-10 my-1 sm:h-14 transition-all duration-300 text-sm sm:text-base",
                        location.pathname === item.href &&
                          "cosmic-gradient text-black font-semibold neon-glow"
                      )}
                      onMouseEnter={() => setHoveredItem(item.href)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <item.icon className={cn("text-lg sm:text-xl", "mr-3")} />
                      <span className="transition-all duration-300 group-hover:translate-x-1">
                        {item.label}
                      </span>
                    </Button>
                  </Link>
                ))}
              </div>
              {!isMobile && (
                <Separator className="my-4 sm:my-6 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
              )}
              {/* Pro Upgrade Section */}
              {!isMobile && (
                <div className="p-3 sm:p-4 space-y-3 relative z-10">
                  <div className="glass-card rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                        <IoMusicalNotes className="text-black text-sm" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm">
                          Upgrade to Pro
                        </h4>
                        <p className="text-xs text-gray-400">
                          Unlimited everything
                        </p>
                      </div>
                    </div>
                    <Button className="w-full cosmic-gradient text-black font-semibold rounded-xl hover:scale-105 transition-all duration-300 neon-glow text-sm h-9 sm:h-10">
                      Get Pro
                    </Button>
                  </div>
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </div>
    </>
  );
}
