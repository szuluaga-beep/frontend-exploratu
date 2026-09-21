"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import { tourQueries } from "@/lib/queries/tour-queries";
import { CreateTourModal } from "./CreateTourModal";
import { TourCard } from "./TourCard";

interface TourListProps {
  token?: string;
  isAuthenticated?: boolean;
}

export function TourList({ token, isAuthenticated = false }: TourListProps) {
  const { data: tours } = useSuspenseQuery(tourQueries.list(token));

  return (
    <div className="flex flex-col gap-6">
      {/* Header row: count + create button (authenticated only) */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground/50">
          {tours.length} {tours.length === 1 ? "tour disponible" : "tours disponibles"}
        </p>

        {isAuthenticated && token && <CreateTourModal token={token} />}
      </div>

      {/* Tour grid or empty state */}
      {tours.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-2xl mb-2">🗺️</p>
          <p className="text-foreground/60">No hay tours disponibles por el momento.</p>
          <p className="text-sm text-foreground/40 mt-1">¡Vuelve pronto!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      )}
    </div>
  );
}
