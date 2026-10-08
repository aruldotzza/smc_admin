"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Car, DollarSign } from "lucide-react";

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
            <Calendar className="size-4 text-blue-600" />
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
            <Car className="size-4 text-indigo-600" />
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
            <DollarSign className="size-4 text-amber-600" />
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
