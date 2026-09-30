import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

type SessionContextValue = {
  status: SessionStatus;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<SessionStatus>('loading');

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'same-origin' });
        if (!cancelled) {
          setStatus(response.ok ? 'authenticated' : 'unauthenticated');
        }
      } catch {
        if (!cancelled) {
          setStatus('unauthenticated');
        }
      }
    }

    void restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => ({ status }), [status]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession muss innerhalb von SessionProvider verwendet werden.');
  }

  return context;
}
