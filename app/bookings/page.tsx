"use client";

import React from "react";
import AdminLayout from "@/Components/Layout/AdminLayout";
import BookingsFilterTabs from "@/Components/Bookings/BookingsFilterTabs";
import BookingsTable from "@/Components/Bookings/BookingsTable";
import BookingDetailsDrawer from "@/Components/Bookings/BookingDetailsDrawer";
import NewBookingModal from "@/Components/Bookings/NewBookingModal";
import { useBookings } from "@/context/BookingContext";
import { Plus } from "lucide-react";

export default function BookingsPage() {
  const { counts, openNewBookingModal, activeBooking } = useBookings();

  return (
    <AdminLayout>
      <div className="w-full flex flex-col justify-start items-start gap-5 font-['Manrope']">
        {/* Page Header matching bookingspaeg.html & Screenshot 3 */}
        <div className="self-stretch flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="inline-flex flex-col justify-start items-start">
            <div className="self-stretch flex flex-col justify-start items-start">
              <h1 className="justify-start text-color-text-primary text-xl font-bold font-['Manrope'] leading-8">
                Bookings
              </h1>
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
            className="px-4 py-2.5 bg-color-background-accent rounded-lg flex justify-start items-center gap-2 hover:brightness-105 transition-all cursor-pointer shadow-xs"
          >
            <Plus className="size-4 text-slate-900" />
            <div className="text-center justify-start text-color-text-primary text-xs font-semibold font-['Manrope'] leading-5">
              New Booking
            </div>
          </button>
        </div>

        {/* Filter Tabs & Search Bar */}
        <BookingsFilterTabs />

        {/* 2-Column Responsive Layout matching Screenshot 4 when booking is selected */}
        <div className="self-stretch flex flex-col lg:flex-row justify-start items-start gap-4">
          <div className="flex-1 w-full min-w-0">
            <BookingsTable />
          </div>

          {/* Details Drawer shown inline on the right side when selected */}
          {activeBooking && (
            <div className="w-full lg:w-80 flex-shrink-0">
              <BookingDetailsDrawer />
            </div>
          )}
        </div>

        {/* New Booking Modal Popup */}
        <NewBookingModal />
      </div>
    </AdminLayout>
  );
}
