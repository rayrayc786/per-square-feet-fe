import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/page";

export const Route = createFileRoute("/neighbourhood-insights/")({
  head: () => ({
    meta: [
      { title: "Neighbourhood Insights — THE CASSTLE CO" },
    ],
  }),
  component: NeighbourhoodInsights,
});

function NeighbourhoodInsights() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="Neighbourhood Insights"
        title="Coming Soon."
        intro="Our research notes on locations are currently being updated."
        variant="dark"
      />
    </PageShell>
  );
}
