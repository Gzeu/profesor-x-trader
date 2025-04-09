import { NextResponse } from "next/server";
import { Spot } from "@binance/connector";

export const runtime = "edge";

export async function GET() {
  const client = new Spot(process.env.BINANCE_API_KEY, process.env.BINANCE_SECRET_KEY);
  try {
    const orderBook = await client.bookTicker("BTCUSDT");
    return NextResponse.json({
      bids: orderBook.data.bidPrice,
      asks: orderBook.data.askPrice,
      bidQty: orderBook.data.bidQty,
      askQty: orderBook.data.askQty,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}