import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { headers } from "next/headers";
import { Suspense } from "react";

import { auth } from "@/lib/auth";
import { tourQueries } from "@/lib/queries/tour-queries";
import { TourList } from "@/components/tours/TourList";

export default async function ToursPage() {
  // Get the current session (token is used for backend auth validations)
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const token = session?.session?.token;

  console.log(token)

  // Create a fresh QueryClient per request (never shared between users)
  const queryClient = new QueryClient();

  // queryClient.query() with staleTime: 'static' is the v5 recommended SSR API
  // 'static' means: treat server-fetched data as always fresh — no refetch on hydration
  await queryClient.query({ ...tourQueries.list(token), staleTime: "static" });

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tours</h1>
        <p className="text-foreground/60 mt-1">
          Explore our available tours and experiences.
        </p>
      </div>

      {/* HydrationBoundary transfers the server-prefetched cache to the client */}
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
          <TourList token={token} />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
}
