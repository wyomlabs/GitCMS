type PublicSession = { user: { id: string } } | null
interface PublicSessionResult {
  data: PublicSession
}

/** The public site deliberately does not read the product session across subdomains. */
export function useSession(): PublicSessionResult {
  return { data: null }
}
