import {
  createContext,
  useCallback,
  useContext,
  type ReactNode,
} from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";

export type AppRoute =
  | "/"
  | "/neighbourhood-insights"
  | "/investment-estimator"
  | "/ai-lifestyle"
  | "/properties"
  | "/about"
  | "/contact"
  | "/signin"
  | "/login"
  | "/owner-community"
  | "/saved";

type Ctx = { go: (to: AppRoute) => void; isPending: boolean };
const TransitionCtx = createContext<Ctx>({ go: () => {}, isPending: false });

export function useArchTransition() {
  return useContext(TransitionCtx);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const go = useCallback(
    (to: AppRoute) => {
      navigate({ to });
      window.scrollTo({ top: 0 });
    },
    [navigate],
  );

  return (
    <TransitionCtx.Provider value={{ go, isPending: false }}>
      {children}
    </TransitionCtx.Provider>
  );
}

/** Navigation link that sends directly to the target page without full-screen overlay. */
export function ArchLink({
  to,
  children,
  className,
  activeClassName,
  exact,
}: {
  to: AppRoute;
  children: ReactNode;
  className?: string | undefined;
  activeClassName?: string | undefined;
  exact?: boolean | undefined;
}) {
  const { go } = useArchTransition();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const active = exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");

  return (
    <Link
      to={to}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        if (pathname === to) return;
        go(to);
      }}
      data-active={active || undefined}
      className={[className, active ? activeClassName : ""].filter(Boolean).join(" ")}
    >
      {children}
    </Link>
  );
}
