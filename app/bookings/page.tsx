"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import BookingsFilterTabs from "@/Components/Bookings/BookingsFilterTabs";
import BookingsTable from "@/Components/Bookings/BookingsTable";
import BookingDetailsDrawer from "@/Components/Bookings/BookingDetailsDrawer";
import NewBookingModal from "@/Components/Bookings/NewBookingModal";
import { useBookings } from "@/context/BookingContext";

export default function BookingsPage() {
  const { counts, openNewBookingModal } = useBookings();

  return (
    <AdminLayout>
      <div className="w-full max-w-[1200px] flex flex-col justify-start items-start gap-5 font-['Manrope']">
        {/* Page Header matching bookingspaeg.html */}
        <div className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <div className="justify-start text-color-text-primary text-xl font-bold font-['Manrope'] leading-8">
                Bookings
              </div>
            </div>
            <div className="pt-0.5 flex flex-col justify-start items-start">
              <div className="justify-start text-color-input-placeholder text-xs font-normal font-['Manrope'] leading-5">
                {counts.all} total bookings
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={openNewBookingModal}
            className="px-4 py-2.5 bg-color-background-accent rounded-lg flex justify-start items-center gap-2 hover:brightness-105 transition-all cursor-pointer"
          >
            <div className="size-4 relative overflow-hidden flex items-center justify-center">
              <div className="size-2.5 outline outline-[1.60px] outline-offset-[-0.80px] outline-slate-900" />
            </div>
            <div className="text-center justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
              New Booking
            </div>
          </button>
        </div>

        {/* Filter Tabs & Search Bar */}
        <BookingsFilterTabs />

        {/* Bookings Data Table */}
        <BookingsTable />

        {/* Popups & Drawers */}
        <BookingDetailsDrawer />
        <NewBookingModal />
      </div>
    </AdminLayout>
  );
}
