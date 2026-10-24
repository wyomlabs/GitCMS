/** Dates are stored as calendar days, so format them in UTC to avoid shifting a day. */
export function formatDate(date: string, month: 'short' | 'long' = 'short') {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month, day: 'numeric', timeZone: 'UTC' })
}
