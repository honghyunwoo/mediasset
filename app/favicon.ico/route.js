export function GET(request) {
  return Response.redirect(new URL("/icon.svg", request.url), 308);
}
