import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import createMiddleware from "next-intl/middleware";

const handleI18nRouting = createMiddleware({
  locales: ["en", "ru"],
  defaultLocale: "en",
});

export async function middleware(request: NextRequest) {
  const response = handleI18nRouting(request);

  return await updateSession(request, response);
}

export const config = {
  matcher: ["/", "/(ru|en)/:path*"],
};
