"use client";

import { useState } from "react";
import Link from "next/link";
import { IoCall, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FaTelegramPlane, FaInstagram, FaViber } from "react-icons/fa";

const FloatingMenu = () => {
  const [open, setOpen] = useState(false);

  const links = [
    {
      name: "Instagram",
      url: "https://instagram.com/galavitastroy",
      icon: <FaInstagram className="text-white text-xl" />,
      bg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500"
    },
    {
      name: "Viber",
      url: "viber://chat",
      icon: <FaViber className="text-white text-xl" />,
      bg: "bg-purple-600"
    },
    {
      name: "Telegram",
      url: "https://t.me/+375296543376",
      icon: <FaTelegramPlane className="text-white text-xl" />,
      bg: "bg-blue-400"
    },
    {
      name: "Позвонить",
      url: "tel:+375296543376",
      icon: <IoCall className="text-white text-xl" />,
      bg: "bg-blue-600"
    }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
      {/* Ссылки */}
      {open &&
        links.map((link, i) => (
          <Link
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
            } ${link.bg}`}
          >
            {link.icon}
          </Link>
        ))}

      {/* Кнопка */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 rounded-full bg-primary text-white shadow-xl flex items-center justify-center transition-transform duration-300 ${
          open ? "rotate-12 scale-105" : "hover:scale-110"
        }`}
        aria-label="Контакты"
      >
        <IoChatbubbleEllipsesOutline className="text-2xl animate-pulse" />
      </button>
    </div>
  );
};

export default FloatingMenu;
