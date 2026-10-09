import { lazy, Suspense, useEffect, useState } from "react";
import { type Property } from "@/lib/site-data";

// Lazy load the map to prevent Leaflet from executing during SSR
const MapInner = lazy(() => import("./PropertiesMapInner").then(m => ({ default: m.PropertiesMap })));

interface PropertiesMapProps {
  properties: Property[];
  hoveredPropertyId?: string | null;
}

export function PropertiesMap(props: PropertiesMapProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="w-full h-full bg-muted animate-pulse" />;
  }

  return (
    <Suspense fallback={<div className="w-full h-full bg-muted animate-pulse" />}>
      <MapInner {...props} />
    </Suspense>
  );
}
