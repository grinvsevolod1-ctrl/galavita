import Link from "next/link";
import { IoClose } from "react-icons/io5";
import menu from "@/config/menu.json";
import config from "@/config/config.json";
import type { FC } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: FC<Props> = ({ isOpen, onClose }) => {
  const { main } = menu;
  const { navigation_button } = config;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />

          <div
            id="mobile-menu"
            className="ml-auto h-full w-72 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-lg font-semibold">Меню</span>
              <button onClick={onClose}>
                <IoClose className="text-2xl text-gray-600 dark:text-white" />
              </button>
            </div>

            <ul className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700">
              {main.map((item) =>
                item.hasChildren && item.children
                  ? item.children.map((child) => (
                      <li key={child.url}>
                        <Link
                          href={child.url}
                          className="block px-4 py-3 text-sm font-semibold font-sans tracking-wide text-gray-800 dark:text-gray-200 hover:text-primary transition"
                          onClick={onClose}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))
                  : (
                    <li key={item.url}>
                      <Link
                        href={item.url}
                        className="block px-4 py-3 text-sm font-semibold font-sans tracking-wide text-gray-800 dark:text-gray-200 hover:text-primary transition"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )
              )}
            </ul>

            {navigation_button.enable && (
              <div className="p-4">
                <Link
                  href={navigation_button.link}
                  className="btn btn-primary w-full text-center"
                  onClick={onClose}
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
    </>
  );
};

export default MobileMenu;
