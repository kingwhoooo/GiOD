import { newsResponse } from "../../lib/akorda-news.mjs";

export function onRequestGet(context) {
  return newsResponse(context.request, {
    cache: caches.default,
    waitUntil: (promise) => context.waitUntil(promise)
  });
}
