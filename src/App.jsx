import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import MarketingSite from './pages/MarketingSiteV2'
import AppShell from './pages/app/AppShell'
import Dashboard from './pages/app/Dashboard'
import Library from './pages/app/Library'
import LpaiChart from './pages/app/LpaiChart'
import Profile from './pages/app/Profile'
import Vault from './pages/app/Vault'

import LoginRegister from './pages/app/LoginRegister'
import LoadingScreen from './components/LoadingScreen'
import './index.css'

function getAppRoute() {
  const hash = window.location.hash.slice(1) || '/'
  if (hash === '/login') return 'login'
  if (hash === '/app' || hash === '/app/') return 'dashboard'
  if (hash.startsWith('/app/library')) return 'library'
  if (hash.startsWith('/app/lpai')) return 'lpai'
  if (hash.startsWith('/app/profile')) return 'profile'
  if (hash.startsWith('/app/vault')) return 'vault'

  return null
}

const VIEWPORT_DEFAULT = 'width=device-width, initial-scale=1.0, viewport-fit=cover'
const VIEWPORT_APP = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'

function AppContent() {
  const { user, authLoading, isConfigured } = useAuth()
  const [appRoute, setAppRoute] = useState(getAppRoute)
  const [appIntroDone, setAppIntroDone] = useState(() => {
    try { return sessionStorage.getItem('lifeproof_app_intro_done') === '1' }
    catch { return false }
  })

  useEffect(() => {
    const onHashChange = () => setAppRoute(getAppRoute())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    if (user && appRoute === 'login') {
      window.location.hash = '#/app'
    }
  }, [user, appRoute])

  const inApp = appRoute !== null

  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]')
    if (!meta) return
    meta.setAttribute('content', inApp ? VIEWPORT_APP : VIEWPORT_DEFAULT)
    return () => meta.setAttribute('content', VIEWPORT_DEFAULT)
  }, [inApp])


  if (!inApp) return <MarketingSite />

  if (!isConfigured) {
    return (
      <div style={{ padding: '2rem', color: '#fff' }}>
        <h2>Backend setup required</h2>
        <p>Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your environment.</p>
      </div>
    )
  }

  if (authLoading) {
    return <LoadingScreen onComplete={() => {}} />
  }

  const showLogin = appRoute === 'login' || !user
  if (showLogin) return <LoginRegister />

  if (appRoute === 'dashboard' && !appIntroDone) {
    return (
      <LoadingScreen
        onComplete={() => {
          try { sessionStorage.setItem('lifeproof_app_intro_done', '1') }
          catch (_) {}
          setAppIntroDone(true)
        }}
      />
    )
  }

  return (
    <AppShell currentRoute={appRoute}>
      {appRoute === 'dashboard' && <Dashboard />}
      {appRoute === 'library' && <Library />}
      {appRoute === 'lpai' && <LpaiChart />}
      {appRoute === 'profile' && <Profile />}
      {appRoute === 'vault' && <Vault />}
    </AppShell>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
