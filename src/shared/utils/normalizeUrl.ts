export function normalizeUrl(url: string) {
  url = url.trim();
  if (!/^https?:\/\//i.test(url)) url = `http://${url}`;
  return new URL(url);
}
