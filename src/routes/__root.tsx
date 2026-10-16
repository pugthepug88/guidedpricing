import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteNav } from "../components/SiteNav";
import { DominoFooter } from "../components/DominoFooter";
import { getSocialImageUrl, getSiteOrigin } from "../lib/social";
import { getPageSeo } from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: ({ matches }) => {
    const pathname = matches[matches.length - 1]?.pathname ?? "/";
    const seo = getPageSeo(
      getSiteOrigin(),
      pathname,
      matches.some(
        (match) => match.status === "notFound" || match.status === "error" || match._notFound,
      ),
    );
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Zapla | Customer Communication and Follow Through" },
        {
          name: "description",
          content:
            "Keep customer enquiries, conversations and follow-up moving with Zapla. One platform for your team, launched with you.",
        },
        { name: "author", content: "Zapla" },
        { name: "robots", content: seo.robots },
        ...(seo.canonical ? [{ property: "og:url", content: seo.canonical }] : []),
        { property: "og:title", content: "Zapla | Customer Communication and Follow Through" },
        {
          property: "og:description",
          content:
            "Keep customer enquiries, conversations and follow-up moving with Zapla. One platform for your team, launched with you.",
        },
        { property: "og:type", content: "website" },
        { property: "og:image", content: getSocialImageUrl() },
        { property: "og:image:type", content: "image/png" },
        { property: "og:image:width", content: "1733" },
        { property: "og:image:height", content: "907" },
        {
          property: "og:image:alt",
          content:
            "Zapla. You lead. Zapla follows through. Unlimited users. One flat price. Blue Zapla dominoes cross a warm autumn landscape.",
        },
        { name: "twitter:image", content: getSocialImageUrl() },
        {
          name: "twitter:image:alt",
          content: "Zapla. You lead. Zapla follows through. Unlimited users. One flat price.",
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Zapla | Customer Communication and Follow Through" },
        {
          name: "twitter:description",
          content:
            "Keep customer enquiries, conversations and follow-up moving with Zapla. One platform for your team, launched with you.",
        },
      ],
      links: [
        ...(seo.canonical ? [{ rel: "canonical", href: seo.canonical }] : []),
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800;900&display=swap",
        },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteNav />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <DominoFooter />
    </QueryClientProvider>
  );
}
