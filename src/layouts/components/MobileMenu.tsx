import Link from "next/link";
import { IoClose } from "react-icons/io5";
import menu from "@/config/menu.json";
import config from "@/config/config.json";

const MobileMenu = ({ isOpen, onClose }) => {
  const { main } = menu;
  const { navigation_button } = config;

  return (
    <>
      {/* Затемнение фона */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Меню */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
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
                      className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
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
                    className="block px-4 py-3 text-sm text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={onClose}
                  >
                    {item.name}
                  </Link>
                </li>
              )
          )}
        </ul>

        {/* Кнопка внизу */}
        {navigation_button.enable && (
          <div className="p-4 mt-auto">
            <Link
              href={navigation_button.link}
              className="btn btn-primary w-full text-center"
              onClick={onClose}
            >
              {navigation_button.label}
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;
