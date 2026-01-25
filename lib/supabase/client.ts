import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    return createMockClient()
  }

  return createBrowserClient(url, key)
}

function createMockClient() {
  return {
    auth: {
      getSession: async () => ({ data: { session: null } }),
      signOut: async () => ({ error: null }),
      signInWithPassword: async () => ({ data: null, error: null }),
      signUp: async () => ({ data: null, error: null }),
      onAuthStateChange: (_callback: any) => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: (table: string) => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: null }),
        }),
      }),
    }),
  } as any
}
