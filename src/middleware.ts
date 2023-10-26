export { default } from "next-auth/middleware"

export const config = {
  matcher: [
    "/flight-paths",
    "/reservations",
    "/properties",
    "/wishlists",
  ]
}