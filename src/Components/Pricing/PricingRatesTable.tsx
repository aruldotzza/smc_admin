"use client";

import React from "react";
import { usePricing } from "@/context/PricingContext";
import { VehiclePricingRate } from "@/types/pricing";

export default function PricingRatesTable() {
  const { rates, updateRate } = usePricing();

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wide">
              <th className="px-5 py-3.5">Vehicle</th>
              <th className="px-5 py-3.5">Capacity</th>
              <th className="px-5 py-3.5">Base Fare</th>
              <th className="px-5 py-3.5">Meet & Greet</th>
              <th className="px-5 py-3.5">3-Hour Charter</th>
              <th className="px-5 py-3.5">8-Hour Charter</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs text-[#071E3B]">
            {rates.map((rate: VehiclePricingRate) => (
              <tr
                key={rate.id}
                className="hover:bg-[#FBF7EC]/40 transition-colors"
              >
                {/* Vehicle Name & Model */}
                <td className="px-5 py-4">
                  <div className="font-semibold text-xs text-[#071E3B]">
                    {rate.name}
                  </div>
                  <div className="text-[11px] text-slate-500">{rate.model}</div>
                </td>

                {/* Capacity */}
                <td className="px-5 py-4 text-slate-500 font-medium whitespace-nowrap">
                  {rate.capacityText}
                </td>

                {/* Base Fare Input */}
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-[#C6A45A] focus-within:border-[#C6A45A]">
                    <span className="text-[#C6A45A] font-semibold">$</span>
                    <input
                      type="number"
                      value={rate.baseFare}
                      onChange={(e) =>
                        updateRate(rate.id, "baseFare", Number(e.target.value))
                      }
                      className="w-10 text-center font-semibold text-xs text-[#C6A45A] bg-transparent outline-none"
                    />
                  </div>
                </td>

                {/* Meet & Greet Input */}
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-[#C6A45A] focus-within:border-[#C6A45A]">
                    <span className="text-[#C6A45A] font-semibold">$</span>
                    <input
                      type="number"
                      value={rate.meetAndGreet}
                      onChange={(e) =>
                        updateRate(
                          rate.id,
                          "meetAndGreet",
                          Number(e.target.value)
                        )
                      }
                      className="w-10 text-center font-semibold text-xs text-[#C6A45A] bg-transparent outline-none"
                    />
                  </div>
                </td>

                {/* 3-Hour Charter */}
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-[#C6A45A] focus-within:border-[#C6A45A]">
                    <span className="text-[#C6A45A] font-semibold">$</span>
                    <input
                      type="number"
                      value={rate.charter3h}
                      onChange={(e) =>
                        updateRate(rate.id, "charter3h", Number(e.target.value))
                      }
                      className="w-12 text-center font-semibold text-xs text-[#C6A45A] bg-transparent outline-none"
                    />
                  </div>
                </td>

                {/* 8-Hour Charter */}
                <td className="px-5 py-4">
                  <div className="inline-flex items-center gap-1 bg-slate-50 hover:bg-white border border-slate-200 rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-[#C6A45A] focus-within:border-[#C6A45A]">
                    <span className="text-[#C6A45A] font-semibold">$</span>
                    <input
                      type="number"
                      value={rate.charter8h}
                      onChange={(e) =>
                        updateRate(rate.id, "charter8h", Number(e.target.value))
                      }
                      className="w-12 text-center font-semibold text-xs text-[#C6A45A] bg-transparent outline-none"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
