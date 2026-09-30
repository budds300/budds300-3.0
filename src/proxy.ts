import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Directory-sorting and crawler parameters flagged in Search Console
const STRIP_PARAMS = new Set([
  "MD",
  "NA",
  "SD",
  "SA",
  "ND",
  "MA",
  "C",
  "O",
  "N",
  "M",
  "S",
  "D",
]);

export function proxy(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  let hasParamToStrip = false;
  for (const param of STRIP_PARAMS) {
    if (searchParams.has(param)) {
      hasParamToStrip = true;
      searchParams.delete(param);
    }
  }

  if (hasParamToStrip) {
    const cleanUrl = request.nextUrl.clone();
    const remainingQuery = searchParams.toString();
    cleanUrl.search = remainingQuery ? `?${remainingQuery}` : "";

    // 301 permanent redirect to clean canonical URL
    return NextResponse.redirect(cleanUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (/api/*)
     * - admin routes (/admin/*)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt
     */
    "/((?!api|admin|_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)",
  ],
};
