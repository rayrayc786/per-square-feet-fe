import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageHeader, PageShell, Section } from "@/components/site/page";
import { properties, type Property } from "@/lib/site-data";
import { useSavedProperties } from "@/hooks/use-saved-properties";

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

      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16 pt-12 pb-24 flex flex-col lg:flex-row gap-12 xl:gap-20">
        
        {/* Left Sidebar: Filters */}
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-10">
          <div>
            <h3 className="font-display text-2xl mb-2 text-foreground">Filters</h3>
            <p className="text-sm text-muted-foreground">{list.length} {list.length === 1 ? 'residence' : 'residences'} found</p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-muted-foreground">DESTINATION</span>
            <div className="relative border-b border-border pb-2">
              <select 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full appearance-none bg-transparent text-foreground outline-none text-sm cursor-pointer pr-8"
              >
                <option>All destinations</option>
                <option>Jim Corbett</option>
                <option>Mukteshwar</option>
                <option>Rishikesh</option>
                <option>Sohna</option>
                <option>Kasauli</option>
                <option>Dhanaulti</option>
                <option>Nainital</option>
                <option>Alwar</option>
              </select>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground text-xs">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1 4 4 4-4"/></svg>
              </span>
            </div>
          </div>

          <RadioGroup 
            label="PRICE RANGE" 
            options={["Any", "Under ₹3 Cr", "₹3 Cr - ₹5 Cr", "Above ₹5 Cr"]} 
            value={priceRange} 
            onChange={setPriceRange} 
          />

          <RadioGroup 
            label="PROPERTY TYPE" 
            options={["Any", "Villa", "Apartment", "Heritage", "Penthouse"]} 
            value={propertyType} 
            onChange={setPropertyType} 
          />

          <RadioGroup 
            label="BEDROOMS" 
            options={["Any", "1-2", "3-4", "5+"]} 
            value={bedrooms} 
            onChange={setBedrooms} 
          />
          
          <RadioGroup 
            label="STATUS" 
            options={["Any", "Ready to move", "Under construction"]} 
            value={status} 
            onChange={setStatus} 
          />

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-muted-foreground">LIFESTYLE</span>
            <div className="flex flex-wrap gap-2">
              {["PRIVACY", "WELLNESS", "FAMILY", "NATURE", "VIEWS", "COMMUNITY", "HOSPITALITY", "RENTAL POTENTIAL"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleLifestyle(tag)}
                  className={`border px-3 py-2 text-[0.6rem] uppercase tracking-[0.16em] transition-colors rounded-sm ${
                    lifestyleFilters.includes(tag) 
                      ? "border-gold bg-gold/5 text-gold" 
                      : "border-border text-muted-foreground hover:border-gold hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Right Content: Sort & Grid */}
        <div className="flex-1 flex flex-col">
          
          {/* Top Sort Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border mb-8">
            <span className="eyebrow text-muted-foreground hidden sm:block">Showing {list.length} results</span>
            <div className="flex items-center gap-4 self-end sm:self-auto">
              <span className="eyebrow text-muted-foreground shrink-0">SORT BY</span>
              <div className="relative border-b border-border pb-1">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none bg-transparent text-foreground outline-none text-sm cursor-pointer pr-6 font-medium"
                >
                  <option value="CURATED">Curated</option>
                  <option value="NEW">Newest</option>
                  <option value="PRICE">Price: Low to High</option>
                  <option value="MOST VIEWED">Most Viewed</option>
                  <option value="BEST MATCH">Best Match</option>
                </select>
                <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-gold text-xs">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><path d="m1 1 4 4 4-4"/></svg>
                </span>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((p) => (
              <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="property-card">
                <div className="thumb">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    width={1280}
                    height={960}
                  />
                  <span className="badge-verified">Verified</span>
                </div>
                <div className="body">
                  <div className="row">
                    <h3>{p.name}</h3>
                    <span className="loc">{p.location}</span>
                  </div>
                  <p className="meta">{p.type} · {p.beds} bedrooms · {p.area}</p>
                  <div className="price-row">
                    <span className="text-sm font-medium text-foreground">{p.price}</span>
                    <span className="rule" />
                    <span className="tags">{p.highlights.slice(0, 2).join(" · ")}</span>
                  </div>
                  <div className="actions">
                    <span className="view-link text-gold">View residence →</span>
                    <button
                      type="button"
                      className={`save-btn ${isSaved(p.id) ? "is-saved" : ""}`}
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleSave(p.id); }}
                    >
                      {isSaved(p.id) ? "Saved ♥" : "Save ♡"}
                    </button>
                  </div>
                </div>
              </Link>
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
                  setStatus("Any");
                  setLifestyleFilters([]);
                }}
                className="btn-base btn-outline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </PageShell>
  );
}
