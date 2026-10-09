import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/neighbourhood-insights/$id")({
  beforeLoad: () => {
    throw redirect({ to: "/neighbourhood-insights" });
  },
});
