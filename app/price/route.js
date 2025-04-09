import { NextResponse } from "next/server";
import { Spot } from "@binance/connector";

export const runtime = "edge";

export async function GET() {
  const client = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET_KEY);
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