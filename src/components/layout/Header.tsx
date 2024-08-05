"use client";
import { RootState } from "@/services/store";
import classNames from "classnames";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import ProfileDropdownMenu from "../menus/ProfileDropdownMenu";
import { IconBell, IconBellRinging } from "@tabler/icons-react";
import { Toggle } from "@/components/ui/toggle";
import { Bold, PlusIcon } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) paths with your paths
  const navigation = [
    { title: "Explore", path: "/explore" },
    { title: "Integrations", path: "javascript:void(0)" },
    { title: "Customers", path: "javascript:void(0)" },
    { title: "Pricing", path: "javascript:void(0)" },
  ];

  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  console.log("isLoggedIn", isLoggedIn, user);

  return (
    <nav className="bg-white border-b w-full md:static md:text-sm md:border-none">
      <div className="items-center px-4 w-full md:flex ">
        {/* <div className="flex items-center justify-between py-3 md:py-5 md:block"> */}
        <div className="flex items-center justify-between  md:block">
          <Link href="/">
            <img
              src="https://www.floatui.com/logo.svg"
              width={120}
              height={50}
              alt="Float UI logo"
            />
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-gray-700 hover:text-indigo-600">
                  <a href={item.path} className="block">
                    {item.title}
                  </a>
                </li>
              );
            })}
            <ThemeToggle />

            <button>
              <IconBell />
            </button>
            <Link href={"/posts/create"}>
              <PlusIcon />
            </Link>
            <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
            {/* {typeof isLoggedIn == "boolean" ? (
              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                {isLoggedIn && typeof isLoggedIn == "boolean" ? (
                  <div>
                    <ProfileDropdownMenu />
                  </div>
                ) : ( */}
            {/* <li>
              <Link
                href="/auth/login"
                className="block py-3 text-center text-gray-700 hover:text-indigo-600 border rounded-lg md:border-none"
              >
                Log in
              </Link>
            </li> */}

            <div>
              <ProfileDropdownMenu />
            </div>
            {/* )}
              </div>
            ) : null} */}
          </ul>
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default Header;
