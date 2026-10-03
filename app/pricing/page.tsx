"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import { usePricing } from "@/context/PricingContext";
import { VehiclePricingRate } from "@/types/pricing";

export default function PricingPage() {
  const { rates, updateRate, saveStatus, saveAllChanges } = usePricing();

  return (
    <AdminLayout>
      <div className="w-full max-w-[1200px] flex flex-col justify-start items-start gap-5 font-['Manrope']">
        {/* Header from PricingPage.html */}
        <div className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xl font-bold font-['Manrope'] leading-8">
                Pricing Management
              </div>
            </div>
            <div className="pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                Click any price to edit it directly. Changes apply immediately.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={saveAllChanges}
            disabled={saveStatus === "saving"}
            className="px-5 py-2.5 bg-color-background-accent rounded-lg flex justify-start items-center gap-2 hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <div className="w-2.5 h-1.5 outline outline-[1.60px] outline-offset-[-0.80px] outline-slate-900" />
            </div>
            <div className="text-center justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
              {saveStatus === "saving"
                ? "Saving..."
                : saveStatus === "saved"
                ? "Saved!"
                : "Save All Changes"}
            </div>
          </button>
        </div>

        {/* 4 Overview Definition Cards from PricingPage.html */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xs font-bold font-['Manrope'] leading-5">
                Base Fare
              </div>
            </div>
            <div className="w-full pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Point-to-point flat rate (SGD)
              </div>
            </div>
          </div>

          <div className="p-4 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xs font-bold font-['Manrope'] leading-5">
                Meet & Greet
              </div>
            </div>
            <div className="w-full pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Airport meet & greet inclusive (SGD)
              </div>
            </div>
          </div>

          <div className="p-4 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xs font-bold font-['Manrope'] leading-5">
                3-Hour Charter
              </div>
            </div>
            <div className="w-full pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Hourly charter, 3-hour package (SGD)
              </div>
            </div>
          </div>

          <div className="p-4 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xs font-bold font-['Manrope'] leading-5">
                8-Hour Charter
              </div>
            </div>
            <div className="w-full pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                Full-day charter, 8-hour package (SGD)
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Rates Table matching PricingPage.html */}
        <div className="w-full bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-stone-100 border-b border-color-border-subtle text-color-input-placeholder text-xs font-semibold font-['Manrope'] uppercase tracking-wide">
                  <th className="w-56 h-11 px-5 py-3.5">Vehicle</th>
                  <th className="w-52 h-11 px-5 py-3.5">Capacity</th>
                  <th className="w-40 h-11 px-5 py-3.5">Base Fare</th>
                  <th className="w-48 h-11 px-5 py-3.5">Meet & Greet</th>
                  <th className="w-56 h-11 px-5 py-3.5">3-Hour Charter</th>
                  <th className="w-56 h-11 px-5 py-3.5">8-Hour Charter</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {rates.map((rate: VehiclePricingRate) => (
                  <tr
                    key={rate.id}
                    className="hover:bg-stone-50/60 transition-colors"
                  >
                    {/* Vehicle */}
                    <td className="w-56 px-5 py-4">
                      <div className="w-44 flex flex-col justify-start items-start">
                        <div className="justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5 truncate">
                          {rate.name}
                        </div>
                      </div>
                      <div className="w-44 flex flex-col justify-start items-start">
                        <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4 truncate">
                          {rate.model}
                        </div>
                      </div>
                    </td>

                    {/* Capacity */}
                    <td className="w-52 px-5 py-4">
                      <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                        {rate.capacityText}
                      </div>
                    </td>

                    {/* Base Fare */}
                    <td className="w-40 px-5 py-4">
                      <div className="inline-flex items-center gap-1 bg-stone-50 hover:bg-white border border-color-border-subtle rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-amber-500">
                        <span className="text-orange-400 font-semibold text-sm font-['Manrope']">
                          $
                        </span>
                        <input
                          type="number"
                          value={rate.baseFare}
                          onChange={(e) =>
                            updateRate(rate.id, "baseFare", Number(e.target.value))
                          }
                          className="w-12 text-center text-orange-400 font-semibold text-sm font-['Manrope'] bg-transparent outline-none"
                        />
                      </div>
                    </td>

                    {/* Meet & Greet */}
                    <td className="w-48 px-5 py-4">
                      <div className="inline-flex items-center gap-1 bg-stone-50 hover:bg-white border border-color-border-subtle rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-amber-500">
                        <span className="text-orange-400 font-semibold text-sm font-['Manrope']">
                          $
                        </span>
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
                          className="w-12 text-center text-orange-400 font-semibold text-sm font-['Manrope'] bg-transparent outline-none"
                        />
                      </div>
                    </td>

                    {/* 3-Hour Charter */}
                    <td className="w-56 px-5 py-4">
                      <div className="inline-flex items-center gap-1 bg-stone-50 hover:bg-white border border-color-border-subtle rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-amber-500">
                        <span className="text-orange-400 font-semibold text-sm font-['Manrope']">
                          $
                        </span>
                        <input
                          type="number"
                          value={rate.charter3h}
                          onChange={(e) =>
                            updateRate(rate.id, "charter3h", Number(e.target.value))
                          }
                          className="w-14 text-center text-orange-400 font-semibold text-sm font-['Manrope'] bg-transparent outline-none"
                        />
                      </div>
                    </td>

                    {/* 8-Hour Charter */}
                    <td className="w-56 px-5 py-4">
                      <div className="inline-flex items-center gap-1 bg-stone-50 hover:bg-white border border-color-border-subtle rounded-md px-2 py-1 focus-within:ring-1 focus-within:ring-amber-500">
                        <span className="text-orange-400 font-semibold text-sm font-['Manrope']">
                          $
                        </span>
                        <input
                          type="number"
                          value={rate.charter8h}
                          onChange={(e) =>
                            updateRate(rate.id, "charter8h", Number(e.target.value))
                          }
                          className="w-14 text-center text-orange-400 font-semibold text-sm font-['Manrope'] bg-transparent outline-none"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pricing Notes Card matching PricingPage.html */}
        <div className="self-stretch p-5 bg-color-background-selected rounded-xl outline outline-1 outline-offset-[-1px] outline-orange-400/20 flex flex-col justify-start items-start">
          <div className="self-stretch flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-xs font-bold font-['Manrope'] leading-5">
              Pricing Notes
            </div>
          </div>
          <div className="w-full pl-4 pt-1 flex flex-col justify-start items-start gap-1">
            <div className="self-stretch relative flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  All prices are in Singapore Dollars (SGD) and inclusive of GST.
                </div>
              </div>
              <div className="w-3 h-4 left-[-17px] top-0 absolute inline-flex justify-end items-center">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  •
                </div>
              </div>
            </div>

            <div className="self-stretch relative flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  Base fare applies to all local Singapore point-to-point transfers.
                </div>
              </div>
              <div className="w-3 h-4 left-[-17px] top-0 absolute inline-flex justify-end items-center">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  •
                </div>
              </div>
            </div>

            <div className="self-stretch relative flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  Meet & Greet pricing applies to airport transfers with name board service at Changi arrivals.
                </div>
              </div>
              <div className="w-3 h-4 left-[-17px] top-0 absolute inline-flex justify-end items-center">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  •
                </div>
              </div>
            </div>

            <div className="self-stretch relative flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  Charter rates cover unlimited mileage within Singapore for the specified duration.
                </div>
              </div>
              <div className="w-3 h-4 left-[-17px] top-0 absolute inline-flex justify-end items-center">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  •
                </div>
              </div>
            </div>

            <div className="self-stretch relative flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  Prices updated here are reflected immediately for new bookings.
                </div>
              </div>
              <div className="w-3 h-4 left-[-17px] top-0 absolute inline-flex justify-end items-center">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  •
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
