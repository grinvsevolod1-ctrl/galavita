"use client";

import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import config from "@/config/config.json";
import menu from "@/config/menu.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch, IoMenu, IoClose } from "react-icons/io5";

export interface IChildNavigationLink {
  name: string;
  url: string;
}

export interface INavigationLink {
  name: string;
  url?: string;
  hasChildren?: boolean;
  children?: IChildNavigationLink[];
}

const Header = () => {
  const { main }: { main: INavigationLink[] } = menu;
  const { navigation_button, settings } = config;
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      if (startX - endX > 50) setMobileMenuOpen(false);
    };
    const menu = document.getElementById("mobile-menu");
    menu?.addEventListener("touchstart", handleTouchStart);
    menu?.addEventListener("touchend", handleTouchEnd);
    return () => {
      menu?.removeEventListener("touchstart", handleTouchStart);
      menu?.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mobileMenuOpen]);

  const infoChildren =
    main.find((item) => item.name === "Информация" && item.hasChildren)?.children || [];

  const filteredMain = main.filter((item) => item.name !== "Информация");

  return (
    <header className={`header z-30 ${settings.sticky_header && "sticky top-0"}`}>
      <nav className="navbar container flex items-center justify-between relative">
        <div className="flex-shrink-0">
          <Logo />
        </div>

        <ul className="navbar-nav hidden lg:flex lg:w-auto lg:space-x-2 xl:space-x-8">
          {main.map((menu, i) => (
            <React.Fragment key={`menu-${i}`}>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span
                    className={`nav-link inline-flex items-center ${
                      pathname &&
                      menu.children?.some(
                        ({ url }) => url === pathname || `${url}/` === pathname
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block lg:absolute lg:opacity-0 lg:group-hover:visible lg:group-hover:opacity-100">
                    {menu.children?.map((child, j) => (
                      <li className="nav-dropdown-item" key={`children-${j}`}>
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            pathname === `${child.url}/` || pathname === child.url
                              ? "active"
                              : ""
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                menu.url && (
                  <li className="nav-item">
                    <Link
                      href={menu.url}
                      className={`nav-link block ${
                        pathname === `${menu.url}/` || pathname === menu.url ? "active" : ""
                      }`}
                    >
                      {menu.name}
                    </Link>
                  </li>
                )
              )}
            </React.Fragment>
          ))}
        </ul>

        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center text-sm text-text-dark dark:text-white">
            <i className="fa fa-phone mr-2 text-primary text-base" />
            <a href="tel:+375296543376" className="hover:text-primary transition">
              +375 29 654-33-76
            </a>
          </div>

          {settings.search && (
            <button
              className="border-border text-text-dark hover:text-primary dark:border-darkmode-border border-r pr-5 text-xl dark:text-white dark:hover:text-darkmode-primary"
              aria-label="search"
              data-search-trigger
            >
              <IoSearch />
            </button>
          )}

          <ThemeSwitcher className="mr-2" />

          <button
            className="lg:hidden p-4 text-4xl text-text-dark dark:text-white relative top-[-1px] w-16 h-16 rounded-full"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Открыть меню"
          >
            <IoMenu />
          </button>

          {navigation_button.enable && (
            <Link
              className="btn btn-outline-primary btn-sm hidden lg:inline-block"
              href={navigation_button.link}
            >
              {navigation_button.label}
            </Link>
          )}
        </div>
      </nav>

      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <div
            id="mobile-menu"
            className="ml-auto h-full w-72 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold">Меню</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <IoClose className="text-2xl text-gray-600 dark:text-white" />
              </button>
            </div>

            <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {[...filteredMain, ...infoChildren].map((item, i) =>
                item.url ? (
                  <li key={`mobile-${i}`}>
                    <Link
                      href={item.url}
                      className="block px-4 py-3 text-sm font-semibold font-sans tracking-wide text-gray-800 dark:text-gray-200 hover:text-primary transition"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>

            {navigation_button.enable && (
              <div className="p-4">
                <Link
                  href={navigation_button.link}
                  className="btn btn-primary w-full text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {navigation_button.label}
                </Link>
              </div>
            )}

            <div className="p-4 text-center text-sm text-text-dark dark:text-white">
              <a href="tel:+375296543376" className="hover:text-primary transition">
                +375 29 654-33-76
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
