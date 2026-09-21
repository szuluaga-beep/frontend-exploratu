import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";
import { Suspense } from "react";

import { auth } from "@/lib/auth";
import { categoryQueries } from "@/lib/queries/category-queries";
import { cityQueries } from "@/lib/queries/city-queries";
import { tourQueries } from "@/lib/queries/tour-queries";
import { TourList } from "@/components/tours/TourList";

export default async function ToursPage() {
  // Get the current session — determines auth status and provides Bearer token
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = session?.session?.token;
  const isAuthenticated = !!session?.user;

  // Create a fresh QueryClient per request (never shared between users)
  const queryClient = new QueryClient();

  // Prefetch all data needed on this page in parallel
  // tours (public list) + cities + categories (needed by CreateTourModal)
  await Promise.all([
    queryClient.query({ ...tourQueries.list(token), staleTime: "static" }),
    queryClient.query({ ...cityQueries.list(token), staleTime: "static" }),
    queryClient.query({ ...categoryQueries.list(token), staleTime: "static" }),
  ]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tours</h1>
        <p className="text-foreground/60 mt-1">
          Explora nuestros tours y experiencias disponibles.
        </p>
      </div>

      {/* HydrationBoundary transfers ALL server-prefetched cache to the client */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-default-100 animate-pulse h-72"
                />
              ))}
            </div>
          }
        >
          <TourList isAuthenticated={isAuthenticated} token={token} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
