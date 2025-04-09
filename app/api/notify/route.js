import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req) {
  const { message } = await req.json();
  const telegramToken = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_IDS;

  const url = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: message,
  };

  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json({ message: "Notification sent" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}