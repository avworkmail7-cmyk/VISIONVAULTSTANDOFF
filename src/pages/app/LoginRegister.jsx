import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import AddToHomeScreenBanner from '../../components/AddToHomeScreenBanner'
import './LoginRegister.css'

export default function LoginRegister() {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === 'login') login(email, password)
    else register(email, password, name || undefined)
    window.location.hash = '#/app'
  }

  return (
    <div className="login-register">
      <AddToHomeScreenBanner />
      <div className="login-register__center">
        <div className="login-register__card">
          <div className="login-register__head">
            <span className="login-register__logo">◇</span>
            <h1 className="login-register__title">Life Proof</h1>
            <p className="login-register__sub">Sign in or create an account to continue.</p>
          </div>

        <form className="login-register__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label className="login-register__label">
              Name
              <input
                type="text"
                className="login-register__input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Display name"
                autoComplete="name"
              />
            </label>
          )}
          <label className="login-register__label">
            Email
            <input
              type="email"
              className="login-register__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </label>
          <label className="login-register__label">
            Password
            <input
              type="password"
              className="login-register__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
          </label>
          <button type="submit" className="login-register__submit">
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <button
          type="button"
          className="login-register__toggle"
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Log in'}
        </button>
        </div>
      </div>
    </div>
  )
}
