import { NextResponse } from "next/server";
import fetch from "node-fetch";

export const runtime = "edge";

export async function GET() {
  const apiKey = process.env.COINMARKETCAP_API_KEY;
  const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC";

  try {
    const response = await fetch(url, {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey,
        "Accept": "application/json",
      },
    });
    const data = await response.json();
    const btcData = data.data.BTC;
    return NextResponse.json({
      rank: btcData.cmc_rank,
      volume_24h: btcData.quote.USD.volume_24h,
      market_cap: btcData.quote.USD.market_cap,
      circulating_supply: btcData.circulating_supply,
      total_supply: btcData.total_supply,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}