import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [goldBalance, setGoldBalance] = useState(0)
  const [authLoading, setAuthLoading] = useState(true)
  const [accountLoading, setAccountLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    let active = true

    if (!isSupabaseConfigured || !supabase) {
      setAuthLoading(false)
      return () => {
        active = false
      }
    }

    const bootstrap = async () => {
      const { data, error } = await supabase.auth.getSession()
      if (!active) return
      if (error) setAuthError(error.message)
      const currentUser = data?.session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        await loadAccount(currentUser)
      }
      if (active) setAuthLoading(false)
    }

    bootstrap()

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!active) return
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) {
        await loadAccount(currentUser)
      } else {
        setProfile(null)
        setGoldBalance(0)
      }
      setAuthLoading(false)
    })

    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const loadAccount = async (authUser) => {
    if (!supabase || !authUser) return
    setAccountLoading(true)
    setAuthError('')

    const displayName =
      authUser.user_metadata?.name || authUser.user_metadata?.display_name || authUser.email?.split('@')[0] || 'User'

    const [{ error: profileUpsertError }, { error: balanceUpsertError }] = await Promise.all([
      supabase.from('profiles').upsert(
        {
          id: authUser.id,
          email: authUser.email ?? '',
          display_name: displayName,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      ),
      supabase.from('balances').upsert(
        {
          user_id: authUser.id,
          gold: 0,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'user_id' }
      ),
    ])

    if (profileUpsertError) {
      setAuthError(profileUpsertError.message)
    }
    if (balanceUpsertError) {
      setAuthError(balanceUpsertError.message)
    }

    const [{ data: profileData, error: profileFetchError }, { data: balanceData, error: balanceFetchError }] =
      await Promise.all([
        supabase.from('profiles').select('id, email, display_name').eq('id', authUser.id).single(),
        supabase.from('balances').select('gold').eq('user_id', authUser.id).single(),
      ])

    if (profileFetchError) {
      setAuthError(profileFetchError.message)
    }
    if (balanceFetchError) {
      setAuthError(balanceFetchError.message)
    }

    setProfile(profileData || null)
    setGoldBalance(Math.max(0, Number(balanceData?.gold || 0)))
    setAccountLoading(false)
  }

  const login = async (email, password) => {
    if (!supabase) throw new Error('Supabase is not configured.')
    setAuthError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setAuthError(error.message)
      throw error
    }
  }

  const register = async (email, password, name) => {
    if (!supabase) throw new Error('Supabase is not configured.')
    setAuthError('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name || email.split('@')[0],
        },
      },
    })
    if (error) {
      setAuthError(error.message)
      throw error
    }
  }

  const logout = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const setGold = async (nextGold) => {
    if (!supabase || !user) throw new Error('You must be signed in.')
    const safeGold = Math.max(0, Number(nextGold) || 0)
    const { error } = await supabase
      .from('balances')
      .update({ gold: safeGold, updated_at: new Date().toISOString() })
      .eq('user_id', user.id)
    if (error) {
      setAuthError(error.message)
      throw error
    }
    setGoldBalance(safeGold)
    return safeGold
  }

  const addGold = async (amount) => setGold(goldBalance + Math.max(0, Number(amount) || 0))
  const removeGold = async (amount) => setGold(goldBalance - Math.max(0, Number(amount) || 0))

  const displayUser = useMemo(() => {
    if (!user) return null
    return {
      id: user.id,
      email: user.email || profile?.email || '',
      name: profile?.display_name || user.user_metadata?.name || user.email?.split('@')[0] || 'User',
    }
  }, [user, profile])

  return (
    <AuthContext.Provider
      value={{
        user: displayUser,
        authLoading,
        accountLoading,
        authError,
        isConfigured: isSupabaseConfigured,
        goldBalance,
        login,
        register,
        logout,
        addGold,
        removeGold,
        setGold,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
