import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, PageShell } from "@/components/site/page";

export const Route = createFileRoute("/ai-lifestyle")({
  head: () => ({
    meta: [
      { title: "AI Lifestyle — THE CASSTLE CO" },
    ],
  }),
  component: AiLifestyle,
});

function AiLifestyle() {
  return (
    <PageShell>
      <PageHeader
        eyebrow="AI Lifestyle"
        title="Coming Soon."
        intro="We're currently building out this experience."
        variant="dark"
      />
    </PageShell>
  );
}
