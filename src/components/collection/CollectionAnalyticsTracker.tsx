"use client";

import { useEffect } from "react";
import { trackViewCollection } from "@/lib/analytics";

interface TrackerProduct {
  readonly id: string;
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly category?: string;
}

interface CollectionAnalyticsTrackerProps {
  readonly collectionName: string;
  readonly products: ReadonlyArray<TrackerProduct>;
}

/**
 * Fires GA4 view_item_list on mount for the current collection page.
 * Renders nothing — purely a side-effect component.
 */
export function CollectionAnalyticsTracker({
  collectionName,
  products,
}: CollectionAnalyticsTrackerProps) {
  useEffect(() => {
    if (products.length === 0) return;
    trackViewCollection(collectionName, products);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
