import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Property } from "@/lib/site-data";
import { Link } from "@tanstack/react-router";
import { ProductCard } from "./ProductCard";

interface PropertiesMapProps {
  properties: Property[];
  hoveredPropertyId?: string | null;
}

// A simple component to re-center map if properties change or on load
function MapUpdater({ properties }: { properties: Property[] }) {
  const map = useMap();
  useEffect(() => {
    if (properties.length > 0) {
      const lats = properties.map(p => p.lat).filter(Boolean) as number[];
      const lngs = properties.map(p => p.lng).filter(Boolean) as number[];
      
      if (lats.length > 0 && lngs.length > 0) {
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        map.fitBounds([
          [minLat, minLng],
          [maxLat, maxLng]
        ], { padding: [50, 50] });
      }
    }
  }, [properties, map]);
  
  return null;
}

export function PropertiesMap({ properties, hoveredPropertyId }: PropertiesMapProps) {
  // Prevent SSR issues with Leaflet
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-full h-full bg-muted animate-pulse" />;

  const createPriceMarker = (price: string, isHovered: boolean) => {
    // Clean price for marker (e.g. "₹ 95 L - 1.5 Cr" -> "₹95 L")
    const shortPrice = (price || '').split('-')[0].trim().replace('/ sqyd', '').replace('/ sqft', '');
    const bgClass = isHovered ? 'bg-foreground text-background scale-110 z-50' : 'bg-background text-foreground';
    
    return L.divIcon({
      className: "custom-price-marker",
      html: `<div class="${bgClass} font-semibold px-3 py-1.5 rounded-full shadow-md border border-border text-sm hover:bg-foreground hover:text-background transition-all cursor-pointer whitespace-nowrap origin-center">${shortPrice}</div>`,
      iconSize: [undefined as any, undefined as any], // let CSS handle size
      iconAnchor: [30, 15],
    });
  };

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer
        center={[28.6139, 77.2090]} // Default Delhi
        zoom={6}
        scrollWheelZoom={true}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapUpdater properties={properties} />
        
        {properties.map((prop) => {
          if (!prop.lat || !prop.lng) return null;
          return (
            <Marker 
              key={prop.id} 
              position={[prop.lat, prop.lng]}
              icon={createPriceMarker(prop.price, prop.id === hoveredPropertyId)}
            >
              <Popup className="property-popup" maxWidth={320} minWidth={320}>
                <div className="w-[320px]">
                  <ProductCard property={prop} />
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Zoom controls can be added via leaflet native UI or custom overlays */}
    </div>
  );
}
