import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { debug } from "console";

const isProtectedRoute = createRouteMatcher([""]);

export default clerkMiddleware(
  (auth, req) => {
    if (isProtectedRoute(req)) auth().protect();
  },
  {
    debug: true,
  }
);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
