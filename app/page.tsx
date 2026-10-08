"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import HeroBanner from "@/Components/Dashboard/HeroBanner";
import RecentBookingsTable from "@/Components/Dashboard/RecentBookingsTable";
import StatusBreakdownCard from "@/Components/Dashboard/StatusBreakdownCard";
import QuickActionsCard from "@/Components/Dashboard/QuickActionsCard";
import { useBookings } from "@/context/BookingContext";
import { useFleet } from "@/context/FleetContext";
import { Calendar, Clock, Car, Coins } from "lucide-react";

export default function DashboardPage() {
  const { counts } = useBookings();
  const { activeVehiclesCount, totalVehiclesCount } = useFleet();

  return (
    <AdminLayout>
      <div className="w-full flex flex-col justify-start items-start gap-6 font-['Manrope']">
        {/* Top Hero Banner */}
        <HeroBanner />

        {/* 4 Stats Cards matching dashboard.html & Screenshot 2 */}
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
                <Calendar className="size-5 text-blue-600" />
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
                <Clock className="size-5 text-amber-600" />
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
                <Car className="size-5 text-indigo-600" />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  {activeVehiclesCount || 6}
                </div>
              </div>
              <div className="w-full pt-0.5 flex flex-col justify-start items-start">
                <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-4">
                  {totalVehiclesCount || 6} total fleet
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
                <Coins className="size-5 text-amber-600" />
              </div>
            </div>
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="justify-start text-color-text-primary text-2xl font-bold font-['Manrope'] leading-10">
                  $630
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

        {/* Two Columns Layout: Recent Bookings (Left, expands to fill widescreen) & Status Breakdown + Quick Actions (Right) */}
        <div className="self-stretch flex flex-col lg:flex-row gap-6 items-start">
          {/* Left Column: Recent Bookings (Fills available space) */}
          <div className="flex-1 w-full min-w-0">
            <RecentBookingsTable />
          </div>

          {/* Right Column: Booking Status + Quick Actions */}
          <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-6">
            <StatusBreakdownCard />
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
