"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { tourQueries } from "@/lib/queries/tour-queries";
import { TourCard } from "./TourCard";

interface TourListProps {
  token?: string;
}

export function TourList({ token }: TourListProps) {
  const { data: tours } = useSuspenseQuery(tourQueries.list(token));

  if (tours.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-2xl mb-2">🗺️</p>
        <p className="text-foreground/60">No tours available at the moment.</p>
        <p className="text-sm text-foreground/40 mt-1">Check back soon!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  );
}
