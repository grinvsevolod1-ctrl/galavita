"use client";

import { useState, useEffect } from "react";

const GetStartedModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a[href='#get-started']")) {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-darkmode-dark text-black dark:text-white p-6 rounded-xl max-w-xl w-full shadow-2xl relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-xl"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-4">Обсудим ваш проект</h2>
        <p className="mb-6 text-sm">
          Заполните форму — мы свяжемся с вами и предложим оптимальное решение.
        </p>

        <form action="/api/send-telegram" method="POST" className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-darkmode-light"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Телефон"
            required
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-darkmode-light"
          />
          <textarea
            name="message"
            rows={4}
            placeholder="Опишите задачу или интересующий тип работ"
            className="w-full px-4 py-2 rounded bg-gray-100 dark:bg-darkmode-light"
          />
          <button
            type="submit"
            className="btn btn-primary w-full mt-2"
          >
            Отправить заявку
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
          Дополнительно можем предложить:
          <ul className="list-disc list-inside mt-2">
            <li>Выезд инженера на объект</li>
            <li>Предварительную смету</li>
            <li>Архитектурную визуализацию</li>
            <li>Подбор материалов и логистику</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GetStartedModal;
