"use client";

import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import {
  IoHome,
  IoCompass,
  IoHeart,
  IoMic,
  IoPerson,
  IoHeadset,
  IoMusicalNotes,
  IoSearch,
} from "react-icons/io5";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/context/AuthContext";

export function Sidebar({ isMobile }) {
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  const baseNavItems = [
    { href: "/", icon: IoHome, label: "Home" },
    {
      href: "/search",
      icon: IoSearch,
      label: "Search",
      roles: ["artist", "listener"],
    },
    {
      href: "/discover",
      icon: IoCompass,
      label: "Discover",
      roles: ["artist", "listener"],
    },
    {
      href: "/artist-dashboard",
      icon: IoMusicalNotes,
      label: "Artist Dashboard",
      roles: ["artist"],
    },
    {
      href: "/collection",
      icon: IoHeart,
      label: "Collection",
      roles: ["listener"],
    },
    { 
      href: "/studio",
      icon: IoMic,
      label: "Studio",
      roles: ["artist"] 
    },
    {
      href: "/playlist",
      icon: IoHeadset,
      label: "Playlist",
      roles: ["listener"],
    },
  ];

  const navItems = [
    ...baseNavItems.filter(
      (item) =>
        !item.roles || (isLoggedIn && item.roles.includes(user.userType))
    ),
    {
      href: isLoggedIn ? "#" : "/auth",
      icon: IoPerson,
      label: isLoggedIn ? `${user.name} (Logout)` : "Login",
      onClick: isLoggedIn
        ? (e) => {
            e.preventDefault();
            logout();
          }
        : undefined,
      isLogout: isLoggedIn,
    },
  ];

  return (
    <div
      className={cn(
        "glass-sidebar flex transition-all duration-500 ease-in-out relative z-50",
        "h-full flex-col w-[280px] md:w-[320px]",
        isMobile
          ? "fixed top-0 left-0 right-0 h-auto w-full rounded-b-3xl shadow-2xl flex-row justify-between items-center px-4 py-3 sm:px-6 sm:py-4"
          : ""
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-secondary/20 opacity-50",
          isMobile ? "rounded-b-3xl" : "rounded-r-3xl"
        )}
      />
      <div
        className={cn(
          "relative z-10 flex gap-2 items-center",
          isMobile ? "w-full" : "justify-between p-4 sm:p-6"
        )}
      >
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 sm:w-12 sm:h-12 cosmic-gradient rounded-2xl flex items-center justify-center glow-animation">
              <IoHeadset className="text-xl sm:text-2xl text-black" />
            </div>
            <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-secondary rounded-full pulse-animation" />
          </div>
          <div className="transition-all duration-300 group-hover:scale-105">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Rhythmo
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Your Music Universe
            </p>
          </div>
        </Link>

        {isMobile && (
          <div className="flex items-center gap-2 flex-grow-0">
            {navItems.map((item) =>
              item.isLogout ? (
                <Button
                  key="logout"
                  variant="ghost"
                  size="icon"
                  onClick={item.onClick}
                  className={cn(
                    "rounded-2xl h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300",
                    location.pathname === item.href &&
                      "cosmic-gradient text-black font-semibold neon-glow"
                  )}
                >
                  <item.icon className="text-lg sm:text-xl" />
                </Button>
              ) : (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "rounded-2xl h-10 w-10 sm:h-12 sm:w-12 transition-all duration-300",
                      location.pathname === item.href &&
                        "cosmic-gradient text-black font-semibold neon-glow"
                    )}
                  >
                    <item.icon className="text-lg sm:text-xl" />
                  </Button>
                </Link>
              )
            )}
          </div>
        )}
      </div>

      {!isMobile && (
        <>
          <ScrollArea className="flex-1 px-3 sm:px-4 relative z-10">
            <div className="space-y-2 sm:space-y-3">
              {navItems.map((item) =>
                item.isLogout ? (
                  <Button
                    key="logout"
                    variant="ghost"
                    size="default"
                    onClick={item.onClick}
                    className={cn(
                      "w-full justify-start hover:bg-secondary rounded-2xl h-10 my-1 sm:h-14 transition-all duration-300 text-sm sm:text-base",
                      location.pathname === item.href &&
                        "cosmic-gradient text-black font-semibold neon-glow"
                    )}
                  >
                    <item.icon className="text-lg sm:text-xl mr-3" />
                    <span>{item.label}</span>
                  </Button>
                ) : (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant="ghost"
                      size="default"
                      className={cn(
                        "w-full justify-start hover:bg-secondary rounded-2xl h-10 my-1 sm:h-14 transition-all duration-300 text-sm sm:text-base",
                        location.pathname === item.href &&
                          "cosmic-gradient text-black font-semibold neon-glow"
                      )}
                    >
                      <item.icon className="text-lg sm:text-xl mr-3" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              )}
            </div>
            <Separator className="my-4 sm:my-6 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="p-3 sm:p-4 space-y-3 relative z-10">
              <div className="glass-card rounded-2xl p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/30">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 cosmic-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                    <IoMusicalNotes className="text-black text-sm" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm">Upgrade to Pro</h4>
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
          </ScrollArea>
        </>
      )}
    </div>
  );
}
