import type { Tour } from "@/types/tours";

import { Card } from "@heroui/react";

interface TourCardProps {
  tour: Tour;
}

export function TourCard({ tour }: TourCardProps) {
  const imageUrl = `https://picsum.photos/seed/${tour.id}/400/200`;
  const price = parseFloat(tour.pricePerPerson);
  const formattedPrice =
    price === 0
      ? "Free"
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(price);

  return (
    <Card className="overflow-hidden">
      {/* Placeholder image */}
      <img
        alt={`Photo of ${tour.name}`}
        className="w-full h-48 object-cover"
        src={imageUrl}
      />

      <div className="p-4 flex flex-col gap-3">
        {/* Title */}
        <h3 className="text-lg font-semibold text-foreground leading-tight">
          {tour.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-foreground/60 line-clamp-2">
          {tour.description}
        </p>

        {/* Details */}
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-default-100 text-default-700">
            ⏱ {tour.durationMinutes} min
          </span>
          <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-default-100 text-default-700">
            👥 Max {tour.maxCapacity}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-divider">
          <span className="text-xs text-foreground/50">Per person</span>
          <span className="text-base font-bold text-accent">
            {formattedPrice}
          </span>
        </div>
      </div>
    </Card>
  );
}
