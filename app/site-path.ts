const configuredBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const siteBasePath = configuredBasePath.replace(/\/$/, "");

export function sitePath(pathname: string) {
  return `${siteBasePath}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
