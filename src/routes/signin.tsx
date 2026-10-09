import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/site/page";
import { AuthPanel } from "@/components/site/auth-panel";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign In — THE CASSTLE CO" },
      {
        name: "description",
        content: "Create your THE CASSTLE CO account to save homes and track neighbourhoods.",
      },
      { property: "og:title", content: "Sign In — THE CASSTLE CO" },
      {
        property: "og:description",
        content: "Create an account to save homes and follow neighbourhoods.",
      },
    ],
  }),
  component: () => (
    <PageShell>
      <AuthPanel
        eyebrow="Sign In"
        title="Create your account."
        intro="Save homes, follow neighbourhoods and keep your investment estimates in one place."
        cta="Create account"
        withName
      />
    </PageShell>
  ),
});
