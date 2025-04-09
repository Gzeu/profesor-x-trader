"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import PriceChart from "../components/PriceChart";

export default function Home() {
  const [prices, setPrices] = useState({ btc: 0, eth: 0, sol: 0 });
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      const res = await fetch("/api/price");
      const data = await res.json();
      setPrices(data);
    };
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrediction = async (crypto, price) => {
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crypto, price }),
    });
    const data = await res.json();
    setPrediction(data.prediction);
  };

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 flex-shrink-0 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center">
          <i className="fas fa-chart-line text-blue-400 mr-3"></i>
          <h1 className="text-xl font-bold">XTraderVision</h1>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2">Navigation</h2>
            <ul>
              <li className="mb-1">
                <Link href="/" className="flex items-center p-2 rounded bg-blue-600">
                  <i className="fas fa-home mr-3 text-blue-400"></i>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/portfolio" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <i className="fas fa-wallet mr-3 text-green-400"></i>
                  <span>Portfolio</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/ai-signals" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <i className="fas fa-robot mr-3 text-yellow-400"></i>
                  <span>AI Signals</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/alerts" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <i className="fas fa-bell mr-3 text-pink-400"></i>
                  <span>Alerts</span>
                </Link>
              </li>
              <li className="mb-1">
                <Link href="/settings" className="flex items-center p-2 rounded hover:bg-gray-700">
                  <i className="fas fa-cog mr-3 text-purple-400"></i>
                  <span>Settings</span>
                </Link>
              </li>
            </ul>

            <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2 mt-6">Watchlist</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                <div>
                  <span className="font-medium">BTC/USDT</span>
                  <span className="text-xs text-gray-400 block">Bitcoin</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${prices.btc?.toLocaleString()}</div>
                  <div className="text-xs text-green-400">+2.34%</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                <div>
                  <span className="font-medium">ETH/USDT</span>
                  <span className="text-xs text-gray-400 block">Ethereum</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${prices.eth?.toLocaleString()}</div>
                  <div className="text-xs text-red-400">-1.23%</div>
                </div>
              </div>
              <div className="flex justify-between items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
                <div>
                  <span className="font-medium">SOL/USDT</span>
                  <span className="text-xs text-gray-400 block">Solana</span>
                </div>
                <div className="text-right">
                  <div className="font-medium">${prices.sol?.toLocaleString()}</div>
                  <div className="text-xs text-green-400">+3.21%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
          <div className="relative">
            <input
              type="text"
              placeholder="Search pair (e.g. BTC/USDT)"
              className="bg-gray-700 rounded-full py-1 px-4 pl-10 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-2 text-gray-400"></i>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                <span>PX</span>
              </div>
              <span className="text-sm hidden md:inline">ProfesorX</span>
            </div>
          </div>
        </div>

        {/* Main Dashboard */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Market Overview */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">BTC/USDT Market Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Price</div>
                <div className="text-2xl font-bold text-green-400">${prices.btc?.toLocaleString()}</div>
                <div className="text-green-400 text-sm">+2.34% (24h)</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">24h Volume</div>
                <div className="text-2xl font-bold">$1.24B</div>
                <div className="text-green-400 text-sm">+15.6%</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Market Cap</div>
                <div className="text-2xl font-bold">$816.5B</div>
                <div className="text-gray-400 text-sm">#1</div>
              </div>
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="text-gray-400 text-sm mb-1">Circulating Supply</div>
                <div className="text-2xl font-bold">19.3M BTC</div>
                <div className="text-gray-400 text-sm">91.8% of max</div>
              </div>
            </div>
            <div className="h-64 mb-6">
              <PriceChart />
            </div>
          </div>

          {/* AI Signals */}
          <div className="bg-gray-800 rounded-xl p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">AI Trading Signals</h2>
              <button
                className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                onClick={() => fetchPrediction("BTC", prices.btc)}
              >
                Get Prediction
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2">
                    <i className="fas fa-brain text-white"></i>
                  </div>
                  <span className="font-medium">Market Sentiment</span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-full bg-gray-600 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: "65%" }}></div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-green-400">65% Bullish</span>
                </div>
                <p className="text-sm text-gray-300">AI detects increasing accumulation patterns.</p>
              </div>
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-600 flex items-center justify-center mr-2">
                    <i className="fas fa-lightbulb text-white"></i>
                  </div>
                  <span className="font-medium">Trading Recommendation</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Entry Zone</div>
                    <div className="font-medium">$42,100 - $42,300</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Take Profit</div>
                    <div className="font-medium">$43,200</div>
                  </div>
                  <div className="bg-gray-800 rounded p-3">
                    <div className="text-xs text-gray-400 mb-1">Stop Loss</div>
                    <div className="font-medium">$41,600</div>
                  </div>
                </div>
                {prediction && (
                  <div className="mt-3 text-sm text-gray-300">
                    <strong>Prediction:</strong> {prediction}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Trade Panel */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Trade</h2>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Buy BTC</span>
                <span className="text-sm text-gray-400">Max: 0.294 BTC</span>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg p-3 pr-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-3 text-gray-400">BTC</span>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Price</span>
                <span className="text-sm text-gray-400">Market</span>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg p-3 pr-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  value={prices.btc?.toLocaleString()}
                />
                <span className="absolute right-3 top-3 text-gray-400">USDT</span>
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span className="font-medium">Total</span>
              </div>
              <div className="relative mb-2">
                <input
                  type="text"
                  className="w-full bg-gray-700 rounded-lg p-3 pr-20 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="0.00"
                />
                <span className="absolute right-3 top-3 text-gray-400">USDT</span>
              </div>
            </div>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium">
              Buy BTC
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 text-center text-gray-400 border-t border-gray-700">
          Powered by DeepSite - XTraderVision 2025
        </div>
      </div>
    </div>
  );
}