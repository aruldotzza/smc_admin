"use client";

import React from "react";
import Link from "next/link";

export default function QuickActionsCard() {
  return (
    <div className="self-stretch p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle flex flex-col justify-start items-start">
      <div className="self-stretch flex flex-col justify-start items-start">
        <div className="justify-start text-color-text-primary text-base font-bold font-['Manrope'] leading-6">
          Quick Actions
        </div>
      </div>
      <div className="w-full pt-4 flex flex-col justify-start items-start gap-2">
        <Link
          href="/bookings"
          className="self-stretch p-3 bg-stone-100 rounded-lg inline-flex justify-start items-center gap-3 hover:bg-stone-200/70 transition-colors cursor-pointer"
        >
          <div className="size-7 bg-blue-100 rounded-md flex justify-center items-center flex-shrink-0">
            <div className="size-4 relative overflow-hidden">
              <div className="w-3 h-2.5 left-[2px] top-[3px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-blue-600" />
              <div className="w-3 h-[5px] left-[2px] top-[2px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-blue-600" />
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-xs font-medium font-['Manrope'] leading-5">
              Process Bookings
            </div>
          </div>
        </Link>

        <Link
          href="/fleet"
          className="self-stretch p-3 bg-stone-100 rounded-lg inline-flex justify-start items-center gap-3 hover:bg-stone-200/70 transition-colors cursor-pointer"
        >
          <div className="size-7 bg-indigo-100 rounded-md flex justify-center items-center flex-shrink-0">
            <div className="size-4 relative overflow-hidden">
              <div className="w-3.5 h-1 left-[1px] top-[6px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-indigo-600" />
              <div className="w-3.5 h-[3px] left-[1px] top-[10px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-indigo-600" />
              <div className="size-0.5 left-[3.50px] top-[12px] absolute bg-indigo-600" />
              <div className="size-0.5 left-[10.50px] top-[12px] absolute bg-indigo-600" />
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-xs font-medium font-['Manrope'] leading-5">
              Manage Fleet
            </div>
          </div>
        </Link>

        <Link
          href="/pricing"
          className="self-stretch p-3 bg-stone-100 rounded-lg inline-flex justify-start items-center gap-3 hover:bg-stone-200/70 transition-colors cursor-pointer"
        >
          <div className="size-7 bg-amber-100 rounded-md flex justify-center items-center flex-shrink-0">
            <div className="size-4 relative overflow-hidden">
              <div className="size-3 left-[2px] top-[2px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-amber-600" />
              <div className="w-1 h-1.5 left-[6px] top-[5px] absolute outline outline-[1.40px] outline-offset-[-0.70px] outline-amber-600" />
            </div>
          </div>
          <div className="inline-flex flex-col justify-start items-start">
            <div className="justify-start text-color-text-primary text-xs font-medium font-['Manrope'] leading-5">
              Update Pricing
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
