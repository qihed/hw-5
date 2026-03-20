"use client";

import { usePathname } from "next/navigation";
import Header from "components/Header";
import { ComparisonWidgetHost } from "widget/ui/ComparisonWidgetHost/ComparisonWidgetHost";

const LOGO_ONLY_ROUTES = new Set(["/login", "/registration"]);
/** Полный интерфейс (хедер, виджеты) скрыт — страница только по прямому URL. */
const STANDALONE_ROUTES = new Set(["/share"]);

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = STANDALONE_ROUTES.has(pathname);
  const logoOnly = !standalone && LOGO_ONLY_ROUTES.has(pathname);

  return (
    <>
      {!standalone && <Header logoOnly={logoOnly} />}
      {!standalone && <ComparisonWidgetHost />}
      {children}
    </>
  );
}

