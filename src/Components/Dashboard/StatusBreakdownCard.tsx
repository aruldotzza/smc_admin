"use client";

import React from "react";
import { useBookings } from "@/context/BookingContext";

export default function StatusBreakdownCard() {
  const { counts, bookings } = useBookings();
  const total = bookings.length || 1;

  const getWidth = (val: number) => {
    const pct = Math.min(100, Math.max(8, Math.round((val / total) * 100)));
    return `${pct}%`;
  };

  return (
    <div className="self-stretch p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start">
      <div className="self-stretch flex flex-col justify-start items-start">
        <div className="justify-start text-color-text-primary text-base font-bold font-['Manrope'] leading-6">
          Booking Status
        </div>
      </div>
      <div className="w-full pt-4 flex flex-col justify-start items-start gap-3">
        {/* Confirmed */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="px-2 py-0.5 bg-blue-50 rounded-full outline outline-1 outline-offset-[-1px] outline-blue-200 inline-flex flex-col justify-start items-start">
            <div className="justify-start text-blue-700 text-[10px] font-semibold font-['Manrope'] leading-4">
              Confirmed
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full inline-flex flex-col justify-start items-start overflow-hidden">
              <div
                className="h-1.5 bg-color-background-accent rounded-full transition-all duration-300"
                style={{ width: getWidth(counts.confirmed) }}
              />
            </div>
            <div className="w-4 inline-flex flex-col justify-start items-end">
              <div className="text-right justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                {counts.confirmed}
              </div>
            </div>
          </div>
        </div>

        {/* Pending */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="px-2 py-0.5 bg-amber-50 rounded-full outline outline-1 outline-offset-[-1px] outline-amber-200 inline-flex flex-col justify-start items-start">
            <div className="justify-start text-amber-700 text-[10px] font-semibold font-['Manrope'] leading-4">
              Pending
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full inline-flex flex-col justify-start items-start overflow-hidden">
              <div
                className="h-1.5 bg-color-background-accent rounded-full transition-all duration-300"
                style={{ width: getWidth(counts.pending) }}
              />
            </div>
            <div className="w-4 inline-flex flex-col justify-start items-end">
              <div className="text-right justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                {counts.pending}
              </div>
            </div>
          </div>
        </div>

        {/* Completed */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="px-2 py-0.5 bg-green-50 rounded-full outline outline-1 outline-offset-[-1px] outline-green-200 inline-flex flex-col justify-start items-start">
            <div className="justify-start text-green-700 text-[10px] font-semibold font-['Manrope'] leading-4">
              Completed
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full inline-flex flex-col justify-start items-start overflow-hidden">
              <div
                className="h-1.5 bg-color-background-accent rounded-full transition-all duration-300"
                style={{ width: getWidth(counts.completed) }}
              />
            </div>
            <div className="w-4 inline-flex flex-col justify-start items-end">
              <div className="text-right justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                {counts.completed}
              </div>
            </div>
          </div>
        </div>

        {/* In-progress */}
        <div className="self-stretch inline-flex justify-between items-center">
          <div className="px-2 py-0.5 bg-purple-50 rounded-full outline outline-1 outline-offset-[-1px] outline-purple-200 inline-flex flex-col justify-start items-start">
            <div className="justify-start text-purple-700 text-[10px] font-semibold font-['Manrope'] leading-4">
              In-progress
            </div>
          </div>
          <div className="flex justify-start items-center gap-2">
            <div className="w-24 h-1.5 bg-gray-100 rounded-full inline-flex flex-col justify-start items-start overflow-hidden">
              <div
                className="h-1.5 bg-color-background-accent rounded-full transition-all duration-300"
                style={{ width: getWidth(counts.in_progress) }}
              />
            </div>
            <div className="w-4 inline-flex flex-col justify-start items-end">
              <div className="text-right justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
                {counts.in_progress}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
