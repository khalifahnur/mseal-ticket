"use client";

import { TicketContainer } from "@/components/Ticket/Container";
import { fetchTickets } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/types/ticket";
import { use } from "react";
import { Header } from "@/components/Landing/Header";
import { Footer } from "@/components/Landing/Footer";
import FullScreenLoader from "@/components/FullScreenLoader";

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { data, isLoading, error } = useQuery<Event[]>({
    queryKey: ["tickets"],
    queryFn: fetchTickets,
    staleTime: 1000 * 60 * 5,
  });

  const event = data?.find((e) => String(e._id) === String(id));

  if (isLoading) {
    return <FullScreenLoader />;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Error Loading Event</h1>
        <p className="text-muted-foreground mb-4">
          Failed to load event details. Please try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-primary-foreground px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <p className="text-muted-foreground">
          The event you&apos;re looking for doesn&apos;t exist.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header /> <TicketContainer event={event} />
      <Footer />
    </div>
  );
}
