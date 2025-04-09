import { NextResponse } from "next/server";
import { Spot } from "@binance/connector";

export const runtime = "edge";

export async function GET() {
  const apiKey = process.env.BINANCE_API_KEY;
  const secretKey = process.env.BINANCE_SECRET_KEY;

  // Debugging: Verificăm dacă variabilele sunt citite
  if (!apiKey || !secretKey) {
    return NextResponse.json({
      error: "Missing API keys",
      apiKey: apiKey || "undefined",
      secretKey: secretKey || "undefined",
    }, { status: 500 });
  }

  const client = new Spot(apiKey, secretKey);
  try {
    const ticker = await client.tickerPrice("BTCUSDT");
    const ethTicker = await client.tickerPrice("ETHUSDT");
    const solTicker = await client.tickerPrice("SOLUSDT");
    return NextResponse.json({
      btc: parseFloat(ticker.data.price),
      eth: parseFloat(ethTicker.data.price),
      sol: parseFloat(solTicker.data.price),
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}