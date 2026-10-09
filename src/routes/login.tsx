import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page";
import { AuthPanel } from "@/components/site/auth-panel";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log In — THE CASSTLE CO" },
      {
        name: "description",
        content: "Log in to your THE CASSTLE CO account to return to your saved shortlist.",
      },
      { property: "og:title", content: "Log In — THE CASSTLE CO" },
      {
        property: "og:description",
        content: "Return to your saved shortlist and estimates.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <AuthPanel
        eyebrow="Log In"
        title="Welcome back."
        intro="Pick up where you left off — your shortlist, saved searches and estimates."
        cta="Log in"
      />
    </PageShell>
  ),
});
