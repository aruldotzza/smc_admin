"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { Booking, BookingStatus, BookingChannel } from "@/types/booking";
import { initialBookings } from "@/data/initialBookings";

interface BookingContextType {
  bookings: Booking[];
  activeBookingId: string | null;
  activeBooking: Booking | null;
  isNewBookingModalOpen: boolean;
  openNewBookingModal: () => void;
  closeNewBookingModal: () => void;
  openBookingDetails: (id: string) => void;
  closeBookingDetails: () => void;
  addBooking: (data: Partial<Booking>) => Booking;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  assignDriver: (
    id: string,
    driver: { name: string; phone: string; vehiclePlate: string }
  ) => void;
  deleteBooking: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  channelFilter: string;
  setChannelFilter: (channel: string) => void;
  filteredBookings: Booking[];
  counts: {
    all: number;
    pending: number;
    confirmed: number;
    in_progress: number;
    completed: number;
    cancelled: number;
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [activeBookingId, setActiveBookingId] = useState<string | null>(null);
  const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");

  const openNewBookingModal = () => setIsNewBookingModalOpen(true);
  const closeNewBookingModal = () => setIsNewBookingModalOpen(false);

  const openBookingDetails = (id: string) => setActiveBookingId(id);
  const closeBookingDetails = () => setActiveBookingId(null);

  const activeBooking = useMemo(() => {
    return bookings.find((b) => b.id === activeBookingId) || null;
  }, [bookings, activeBookingId]);

  const addBooking = (data: Partial<Booking>): Booking => {
    const nextNum = bookings.length + 1;
    const refNumber = `SMC-${String(nextNum).padStart(4, "0")}`;
    const newBooking: Booking = {
      id: String(Date.now()),
      refNumber,
      customerName: data.customerName || "Customer",
      phone: data.phone || "+65 9000 0000",
      email: data.email || "customer@example.com",
      serviceType: data.serviceType || "airport_transfer",
      vehicleType: data.vehicleType || "7_seater",
      vehicleName: data.vehicleName || "7-Seater Mercedes V-Class",
      pickupLocation: data.pickupLocation || "Changi Airport T3",
      dropoffLocation: data.dropoffLocation || "Marina Bay Sands",
      pickupDate: data.pickupDate || new Date().toISOString().split("T")[0],
      pickupTime: data.pickupTime || "12:00",
      flightNumber: data.flightNumber,
      passengers: data.passengers || 2,
      luggageBags: data.luggageBags || 2,
      meetAndGreet: !!data.meetAndGreet,
      addons: data.addons || [],
      specialRequest: data.specialRequest,
      status: data.status || "pending",
      fare: data.fare || 65,
      channel: data.channel || "whatsapp",
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      driverAssigned: data.driverAssigned,
    };

    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const updateBookingStatus = (id: string, status: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );
  };

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...updates } : b))
    );
  };

  const assignDriver = (
    id: string,
    driver: { name: string; phone: string; vehiclePlate: string }
  ) => {
    setBookings((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              driverAssigned: driver,
              status: b.status === "pending" ? "confirmed" : b.status,
            }
          : b
      )
    );
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
    if (activeBookingId === id) {
      setActiveBookingId(null);
    }
  };

  const counts = useMemo(() => {
    return {
      all: bookings.length,
      pending: bookings.filter((b) => b.status === "pending").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      in_progress: bookings.filter((b) => b.status === "in_progress").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    return bookings.filter((item) => {
      // Status filter
      if (statusFilter !== "all" && item.status !== statusFilter) {
        return false;
      }
      // Channel filter
      if (channelFilter !== "all" && item.channel !== channelFilter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.customerName.toLowerCase().includes(q);
        const matchesRef = item.refNumber.toLowerCase().includes(q);
        const matchesPhone = item.phone.toLowerCase().includes(q);
        const matchesEmail = item.email.toLowerCase().includes(q);
        const matchesLocation =
          item.pickupLocation.toLowerCase().includes(q) ||
          item.dropoffLocation.toLowerCase().includes(q);
        const matchesVehicle = item.vehicleName.toLowerCase().includes(q);

        if (
          !matchesName &&
          !matchesRef &&
          !matchesPhone &&
          !matchesEmail &&
          !matchesLocation &&
          !matchesVehicle
        ) {
          return false;
        }
      }
      return true;
    });
  }, [bookings, statusFilter, channelFilter, searchQuery]);

  return (
    <BookingContext.Provider
      value={{
        bookings,
        activeBookingId,
        activeBooking,
        isNewBookingModalOpen,
        openNewBookingModal,
        closeNewBookingModal,
        openBookingDetails,
        closeBookingDetails,
        addBooking,
        updateBookingStatus,
        updateBooking,
        assignDriver,
        deleteBooking,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        channelFilter,
        setChannelFilter,
        filteredBookings,
        counts,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}
