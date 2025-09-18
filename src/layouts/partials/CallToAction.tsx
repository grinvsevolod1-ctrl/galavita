"use client";

import ImageFallback from "@/helpers/ImageFallback";
import { markdownify } from "@/lib/utils/textConverter";
import { Call_to_action } from "@/types";
import { useState } from "react";

interface PageData {
  notFound?: boolean;
  content?: string;
  frontmatter: Call_to_action;
}

const CallToAction = ({ data }: { data: PageData }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const message = formData.get("message");

    try {
      const res = await fetch("/api/send-telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message }),
      });

      if (res.ok) {
        setStatus("✅ Заявка успешно отправлена!");
        form.reset();
      } else {
        setStatus("❌ Ошибка при отправке. Попробуйте позже.");
      }
    } catch (error) {
      setStatus("⚠️ Ошибка соединения.");
    }
  };

  return (
    <>
      {data.frontmatter.enable && (
        <section className="mb-28">
          <div className="container">
            <div className="rounded-xl bg-light px-4 py-16 dark:bg-darkmode-light xl:p-20">
              <div className="row items-center justify-between">
                <div className="mb-10 md:col-5 lg:col-4 md:order-2 md:mb-0">
                  <ImageFallback
                    className="w-full"
                    src={data.frontmatter.image}
                    width={392}
                    height={390}
                    alt="cta-image"
                  />
                </div>
                <div className="md:col-7 md:order-1">
                  <h2
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.title,
                    )}
                    className="mb-2"
                  />
                  <p
                    dangerouslySetInnerHTML={markdownify(
                      data.frontmatter.description,
                    )}
                    className="mb-6"
                  />

                  {/* Contact Form */}
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block mb-1 font-medium">
                        Имя
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded border border-border bg-white px-4 py-2 dark:bg-darkmode dark:border-darkmode-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block mb-1 font-medium">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full rounded border border-border bg-white px-4 py-2 dark:bg-darkmode dark:border-darkmode-border"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-1 font-medium">
                        Комментарий
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full rounded border border-border bg-white px-4 py-2 dark:bg-darkmode dark:border-darkmode-border"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary mt-4"
                    >
                      Отправить
                    </button>

                    {status && (
                      <p className="mt-4 text-sm text-theme">{status}</p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CallToAction;
