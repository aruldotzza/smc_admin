"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import HeroBanner from "@/Components/Dashboard/HeroBanner";
import RecentBookingsTable from "@/Components/Dashboard/RecentBookingsTable";
import StatusBreakdownCard from "@/Components/Dashboard/StatusBreakdownCard";
import QuickActionsCard from "@/Components/Dashboard/QuickActionsCard";
import { useBookings } from "@/context/BookingContext";
import { useFleet } from "@/context/FleetContext";

export default function DashboardPage() {
  const { counts, bookings } = useBookings();
  const { activeVehiclesCount, totalVehiclesCount } = useFleet();

  const revenueOct = bookings.reduce(
    (sum, b) =>
      b.status === "confirmed" || b.status === "completed" || b.status === "in_progress"
        ? sum + b.fare
        : sum,
    0
  );

  return (
    <AdminLayout>
      <div className="w-full max-w-[1200px] flex flex-col justify-start items-start gap-6">
        {/* Top Hero Banner */}
        <HeroBanner />

        {/* 4 Stats Cards from dashboard.html */}
        <div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Bookings */}
          <div className="p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                  Total Bookings
                </div>
              </div>
              <div className="size-9 bg-blue-50 rounded-lg flex justify-center items-center">
                <div className="size-5 relative overflow-hidden">
                  <div className="w-3.5 h-3 left-[3px] top-[4px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-blue-600" />
                  <div className="w-3.5 h-1.5 left-[3px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-blue-600" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  {counts.all}
                </div>
              </div>
              <div className="w-full pt-0.5 flex flex-col justify-start items-start">
                <div className="justify-start text-green-600 text-xs font-normal font-['Manrope'] leading-4">
                  +3 this week
                </div>
              </div>
            </div>
          </div>

          {/* Pending */}
          <div className="p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                  Pending
                </div>
              </div>
              <div className="size-9 bg-amber-50 rounded-lg flex justify-center items-center">
                <div className="size-5 relative overflow-hidden">
                  <div className="size-4 left-[2px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-amber-600" />
                  <div className="w-[3px] h-1.5 left-[10px] top-[6px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-amber-600" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  {counts.pending}
                </div>
              </div>
              <div className="w-full pt-0.5 flex flex-col justify-start items-start">
                <div className="justify-start text-amber-600 text-xs font-normal font-['Manrope'] leading-4">
                  Needs attention
                </div>
              </div>
            </div>
          </div>

          {/* Active Vehicles */}
          <div className="p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                  Active Vehicles
                </div>
              </div>
              <div className="size-9 bg-indigo-50 rounded-lg flex justify-center items-center">
                <div className="size-5 relative overflow-hidden">
                  <div className="w-4 h-[5px] left-[2px] top-[8px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-indigo-600" />
                  <div className="w-4 h-1 left-[2px] top-[13px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-indigo-600" />
                  <div className="size-[3px] left-[4.50px] top-[15.50px] absolute bg-indigo-600" />
                  <div className="size-[3px] left-[12.50px] top-[15.50px] absolute bg-indigo-600" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  {activeVehiclesCount}
                </div>
              </div>
              <div className="w-full pt-0.5 flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  {totalVehiclesCount} total fleet
                </div>
              </div>
            </div>
          </div>

          {/* Revenue (Oct) */}
          <div className="p-5 bg-color-background-white rounded-xl outline outline-1 outline-offset-[-1px] outline-color-border-subtle inline-flex flex-col justify-start items-start gap-3">
            <div className="self-stretch inline-flex justify-between items-center">
              <div className="inline-flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                  Revenue (Oct)
                </div>
              </div>
              <div className="size-9 bg-amber-50 rounded-lg flex justify-center items-center">
                <div className="size-5 relative overflow-hidden">
                  <div className="size-4 left-[2px] top-[2px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-color-selection-recommended-border" />
                  <div className="w-[5px] h-2 left-[7.50px] top-[6px] absolute outline outline-[1.60px] outline-offset-[-0.80px] outline-color-selection-recommended-border" />
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  ${revenueOct || 630}
                </div>
              </div>
              <div className="w-full pt-0.5 flex flex-col justify-start items-start">
                <div className="justify-start text-green-600 text-xs font-normal font-['Manrope'] leading-4">
                  All confirmed trips
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Two Columns Grid: Recent Bookings (Left) & Status Breakdown + Quick Actions (Right) */}
        <div className="self-stretch grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left Column: Recent Bookings */}
          <div className="lg:col-span-2">
            <RecentBookingsTable />
          </div>

          {/* Right Column: Booking Status + Quick Actions */}
          <div className="flex flex-col gap-4">
            <StatusBreakdownCard />
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
