"use client";

import config from "@/config/config.json";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { FaRegBuilding } from "react-icons/fa";
import { useState } from "react";

const frontmatter = {
  title: "Контакты",
  description: "Свяжитесь с Galavita Stroy — проектирование, строительство, фасады, кровля, благоустройство.",
  meta_title: "Контакты Galavita Stroy",
  image: "/images/contact-banner.png"
};

const Contact = () => {
  const { title, description, meta_title, image } = frontmatter;
  const { contact_form_action } = config.params;

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    await fetch("/api/send-telegram", {
      method: "POST",
      body: formData,
    });

    setSubmitted(true);
  };

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
     

      <section className="section-sm">
        <div className="container">
          <div className="row justify-center">
            <div className="md:col-12 lg:col-10">
              <div className="p-8 border border-border rounded-xl shadow-sm dark:shadow-md">
                {/* Реквизиты */}
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-black dark:text-white">
                  <FaRegBuilding /> Реквизиты Galavita Stroy
                </h2>

                <div className="text-sm text-gray-800 dark:text-gray-200 space-y-3 mb-8">
                  <p><strong>Наименование:</strong> Общество с ограниченной ответственностью «ГалавитаСтрой»</p>
                  <p><strong>УНП:</strong> 193263313</p>
                  <p><strong>Юридический адрес:</strong> 220037, г. Минск, ул. Ташкентская, д. 26, пом. 1</p>
                  <p><strong>Телефон:</strong> +375 (29) 123-45-67</p>
                  <p><strong>Email:</strong> info@galavita.by</p>
                  <p><strong>Банк:</strong> ЗАО «Альфа-Банк», г. Минск</p>
                  <p><strong>Расчётный счёт:</strong> BY12ALFA30123456789012340000</p>
                  <p><strong>БИК:</strong> ALFABY2X</p>
                </div>

                {/* Форма */}
                <h3 className="text-lg font-semibold mb-4 text-black dark:text-white">Связаться с нами</h3>

                {submitted ? (
                  <div className="text-green-600 dark:text-green-400 text-center font-semibold mb-6">
                    ✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-[1fr_1fr_2fr_auto] gap-4 items-start mb-6"
                  >
                    <input
                      id="name"
                      name="name"
                      className="form-input"
                      placeholder="Имя"
                      type="text"
                      required
                    />
                    <input
                      id="email"
                      name="email"
                      className="form-input"
                      placeholder="Email"
                      type="email"
                      required
                    />
                    <textarea
                      id="message"
                      name="message"
                      className="form-input resize-none"
                      placeholder="Комментарий"
                      rows={1}
                      required
                    ></textarea>
                    <button type="submit" className="btn btn-primary w-full md:w-auto">
                      Отправить
                    </button>
                  </form>
                )}

                {/* Кнопка QR */}
                <div className="text-center mb-10">
                  <button
                    onClick={() => window.open("/images/qr.png", "_blank")}
                    className="btn btn-outline-primary"
                  >
                    📲 Поделиться QR
                  </button>
                </div>

                {/* Яндекс.Карта */}
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <iframe
                    src="https://yandex.ru/map-widget/v1/?ll=27.528209%2C53.927547&z=16&mode=search&text=пр.%20Победителей%2C%2029%2C%20Минск"
                    width="100%"
                    height="300"
                    frameBorder="0"
                    allowFullScreen
                    style={{ border: 0 }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
