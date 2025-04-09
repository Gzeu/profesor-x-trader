import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export const runtime = "edge";

export async function POST(req) {
  const { btc, eth, sol } = await req.json();
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db("profesorxtrader");
    const collection = db.collection("prices");
    await collection.insertOne({
      btc,
      eth,
      sol,
      timestamp: new Date(),
    });
    return NextResponse.json({ message: "Prices saved" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await client.close();
  }
}