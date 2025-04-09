import { NextResponse } from "next/server";
import { Groq } from "ai";

export const runtime = "edge";

export async function POST(req) {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const { crypto, price } = await req.json();

  const prompt = `Predict the price trend for ${crypto} over the next week. Current price: ${price} USD.`;
  const response = await groq.chat({
    model: "llama3-70b-8192",
    messages: [{ role: "user", content: prompt }],
  });

  return NextResponse.json({ prediction: response.choices[0].message.content });
}