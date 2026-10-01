import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell, Section } from "@/components/site/page";
import { properties, type Property } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";
import { ProductCard } from "@/components/site/ProductCard";
import { PropertiesMap } from "@/components/site/PropertiesMap";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: "The Collection — Curated Second Homes | Per Square Feet" },
      {
        name: "description",
        content:
          "Browse a curated collection of verified villas, farmhouses and mountain residences across Uttarakhand, Himachal, Haryana and Rajasthan.",
      },
      { property: "og:title", content: "The Collection — Curated Second Homes | Per Square Feet" },
      {
        property: "og:description",
        content: "Browse a curated collection of verified villas, farmhouses and mountain residences.",
      },
    ],
  }),
  component: Properties,
});

const types = ["All", "Villa", "Apartment", "Heritage", "Penthouse"] as const;

function Properties() {
  const [destination, setDestination] = useState("All destinations");
  const [priceRange, setPriceRange] = useState("Any");
  const [propertyType, setPropertyType] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [status, setStatus] = useState("Any");
  const [lifestyleFilters, setLifestyleFilters] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("CURATED");
  const [hoveredPropertyId, setHoveredPropertyId] = useState<string | null>(null);
  const { toggleSave, isSaved } = useSavedProperties();

  const toggleLifestyle = (tag: string) => {
    setLifestyleFilters(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const list = useMemo(() => {
    let filtered = properties;

    if (destination !== "All destinations") {
      filtered = filtered.filter(p => p.location.includes(destination));
    }

    if (propertyType !== "Any") {
      filtered = filtered.filter(p => p.type.includes(propertyType) || (propertyType === "Villa" && p.type.includes("Residence")));
    }

    if (bedrooms !== "Any") {
      if (bedrooms === "1-2") filtered = filtered.filter(p => p.beds >= 1 && p.beds <= 2);
      if (bedrooms === "3-4") filtered = filtered.filter(p => p.beds >= 3 && p.beds <= 4);
      if (bedrooms === "5+") filtered = filtered.filter(p => p.beds >= 5);
    }

    if (priceRange !== "Any") {
      filtered = filtered.filter(p => {
        const priceNum = parseFloat(p.price.replace(/[^\d.]/g, ''));
        if (priceRange === "Under ₹3 Cr") return priceNum < 3;
        if (priceRange === "₹3 Cr - ₹5 Cr") return priceNum >= 3 && priceNum <= 5;
        if (priceRange === "Above ₹5 Cr") return priceNum > 5;
        return true;
      });
    }

    if (lifestyleFilters.length > 0) {
      filtered = filtered.filter(p => 
        lifestyleFilters.some(tag => 
          p.highlights.map(h => h.toUpperCase()).includes(tag.toUpperCase())
        )
      );
    }

    if (sortOption === "PRICE") {
      filtered = [...filtered].sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^\d.]/g, ''));
        const pB = parseFloat(b.price.replace(/[^\d.]/g, ''));
        return pA - pB;
      });
    }

    return filtered;
  }, [destination, propertyType, bedrooms, priceRange, lifestyleFilters, sortOption]);

  const RadioGroup = ({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-4">
      <span className="eyebrow text-muted-foreground">{label}</span>
      <div className="flex flex-col gap-3">
        {options.map(opt => (
          <label key={opt} className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${value === opt ? 'border-gold' : 'border-border group-hover:border-gold/50'}`}>
              {value === opt && <div className="w-2 h-2 rounded-full bg-gold" />}
            </div>
            <span className="text-sm text-foreground">{opt}</span>
            <input type="radio" className="hidden" checked={value === opt} onChange={() => onChange(opt)} />
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <PageShell>
      <PageHeader
        eyebrow="The collection"
        title="Find your place."
        variant="dark"
      />

      <div className="flex flex-col lg:flex-row w-full max-w-[1600px] mx-auto px-4 md:px-8 py-8 gap-8">
        
        {/* Left Area: Filters & Grid */}
        <div className="w-full lg:w-[55%] xl:w-[60%] flex flex-col">
          {/* Horizontal Filters (simplified for space) */}
          <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-6 border-b border-border hide-scrollbar">
            <select 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-muted px-4 py-2.5 rounded-full text-sm font-medium outline-none whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <option>All destinations</option>
              <option>Jim Corbett</option>
              <option>Baghpat, UP</option>
              <option>Goa</option>
              <option>Rajasthan</option>
            </select>
            
            <select 
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="bg-muted px-4 py-2.5 rounded-full text-sm font-medium outline-none whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <option value="Any">Any Price</option>
              <option value="Under ₹3 Cr">Under ₹3 Cr</option>
              <option value="₹3 Cr - ₹5 Cr">₹3 Cr - ₹5 Cr</option>
              <option value="Above ₹5 Cr">Above ₹5 Cr</option>
            </select>

            <select 
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="bg-muted px-4 py-2.5 rounded-full text-sm font-medium outline-none whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <option value="Any">Any Type</option>
              <option value="Villa">Villa</option>
              <option value="Farmhouse">Farmhouse</option>
              <option value="Plot">Plot</option>
            </select>
            
            <select 
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="bg-muted px-4 py-2.5 rounded-full text-sm font-medium outline-none whitespace-nowrap cursor-pointer hover:bg-muted/80 transition-colors"
            >
              <option value="Any">Any Beds</option>
              <option value="1-2">1-2 Beds</option>
              <option value="3-4">3-4 Beds</option>
              <option value="5+">5+ Beds</option>
            </select>
            
            <div className="ml-auto text-sm font-semibold whitespace-nowrap text-foreground shrink-0 pl-4">
              {list.length} homes
            </div>
          </div>
          
          {/* Properties Grid */}
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
            {list.map((p) => (
              <ProductCard 
                key={p.id} 
                property={p} 
                onMouseEnter={() => setHoveredPropertyId(p.id)}
                onMouseLeave={() => setHoveredPropertyId(null)}
              />
            ))}
          </div>
          
          {list.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="eyebrow text-muted-foreground mb-4">No results found</p>
              <h3 className="font-display text-2xl text-foreground mb-6">We couldn't find any properties<br/>matching your filters.</h3>
              <button 
                onClick={() => {
                  setDestination("All destinations");
                  setPriceRange("Any");
                  setPropertyType("Any");
                  setBedrooms("Any");
                }}
                className="btn-base btn-outline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
        
        {/* Right Area: Map */}
        <div className="hidden lg:block lg:w-[45%] xl:w-[40%] h-[calc(100vh-120px)] sticky top-[100px] rounded-2xl overflow-hidden border border-border shadow-md">
          <PropertiesMap properties={list} hoveredPropertyId={hoveredPropertyId} />
        </div>
      </div>
    </PageShell>
  );
}
