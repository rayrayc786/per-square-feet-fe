import { useState, useEffect, useCallback } from "react";

const SAVED_KEY = "per_sq_feet_saved_properties";

function getStoredSaved(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function useSavedProperties() {
  const [savedIds, setSavedIds] = useState<string[]>(getStoredSaved);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const handleSync = () => {
      const next = getStoredSaved();
      setSavedIds((prev) => {
        if (prev.length === next.length && prev.every((id, i) => id === next[i])) {
          return prev;
        }
        return next;
      });
    };

    window.addEventListener("storage", handleSync);
    window.addEventListener("saved-properties-updated", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("saved-properties-updated", handleSync);
    };
  }, []);

  const toggleSave = useCallback((id: string) => {
    const current = getStoredSaved();
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event("saved-properties-updated"));
    } catch (e) {
      console.error("Failed to save properties", e);
    }
  }, []);

  const clearSaved = useCallback(() => {
    try {
      localStorage.setItem(SAVED_KEY, JSON.stringify([]));
      window.dispatchEvent(new Event("saved-properties-updated"));
    } catch (e) {
      console.error("Failed to clear saved properties", e);
    }
  }, []);

  const isSaved = useCallback((id: string) => savedIds.includes(id), [savedIds]);

  return {
    savedIds,
    toggleSave,
    clearSaved,
    isSaved,
    savedCount: savedIds.length,
    isLoaded,
  };
}
