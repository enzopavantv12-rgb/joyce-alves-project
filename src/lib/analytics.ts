export function trackEvent(event: string, params?: Record<string, unknown>) {
  console.log(`[Analytics] Event: ${event}`, params || '');
  // Plugar Meta Pixel / GA4 futuramente
}
