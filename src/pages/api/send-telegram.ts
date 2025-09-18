import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  const { name, phone, message } = req.body;

  const text = `📩 Новая заявка с сайта Galavita Stroy:\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📝 Комментарий: ${message}`;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text,
        }),
      }
    );

    if (!telegramRes.ok) {
      return res.status(500).json({ error: "Ошибка Telegram" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Ошибка сервера" });
  }
}
